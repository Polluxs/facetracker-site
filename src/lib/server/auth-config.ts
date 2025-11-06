import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { db } from './db';
import * as schema from './db/schema';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { storeMagicLink } from './dev-magic-links';

const resend = new Resend(env.RESEND_API_KEY);

// Environment detection
const environment = env.ENVIRONMENT || 'production';
const isProduction = environment === 'production';

// Email configuration per environment
// https://resend.com/docs/dashboard/emails/send-test-emails
interface EmailConfig {
	from: string;
	testEmail: string | null;
	useTestEmail: boolean;
	logDetails: boolean;
}

const emailConfigs: Record<string, EmailConfig> = {
	development: {
		from: env.EMAIL_FROM || 'onboarding@resend.dev',
		testEmail: 'delivered@resend.dev',
		useTestEmail: true,
		logDetails: true
	},
	staging: {
		from: env.EMAIL_FROM || 'staging@resend.dev',
		testEmail: env.STAGING_TEST_EMAIL || null,
		useTestEmail: Boolean(env.STAGING_TEST_EMAIL),
		logDetails: true
	},
	production: {
		from: env.EMAIL_FROM || 'noreply@yourdomain.com',
		testEmail: null,
		useTestEmail: false,
		logDetails: false
	}
};

const emailConfig = emailConfigs[environment] || emailConfigs.development;



export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: schema.user,
			session: schema.session,
			account: schema.account,
			verification: schema.verification
		}
	}),
	advanced: {
		database: {
			generateId: false // Let PostgreSQL auto-generate bigserial IDs
		}
	},
	emailAndPassword: {
		enabled: false // Disable traditional email/password auth
	},
	plugins: [
		magicLink({
			expiresIn: 10 * 60,
			sendMagicLink: async ({ email, url }) => {
				// Store magic link in development mode for UI display
				if (environment === 'development') {
					storeMagicLink(email, url);
				}

				if (!env.RESEND_API_KEY) {
					console.warn(`⚠️ [${environment}] RESEND_API_KEY not configured - magic link sending disabled`);
					console.warn('📧 Magic link URL for manual testing:', url);
					return;
				}

				let recipient = email;
				let labeledEmail = email;

				if (emailConfig.useTestEmail && emailConfig.testEmail) {
					recipient = emailConfig.testEmail;
					if (recipient.endsWith('@resend.dev')) {
						const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
						labeledEmail = recipient.replace('@', `+${username}@`);
					} else {
						labeledEmail = recipient;
					}
				}

				try {
					const { data, error } = await resend.emails.send({
						from: emailConfig.from,
						to: labeledEmail,
						subject: isProduction ? 'Sign in to your account' : `[${environment.toUpperCase()}] Sign in to your account`,
						html: `
							<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
								${!isProduction ? `<div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 10px; margin-bottom: 20px; border-radius: 4px;">
									<strong>⚠️ ${environment.toUpperCase()} ENVIRONMENT</strong>
								</div>` : ''}
								<h2>Sign in to your account</h2>
								<p>Click the button below to sign in to your account. This link will expire in 10 minutes.</p>
								<div style="text-align: center; margin: 30px 0;">
									<a href="${url}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
										Sign In
									</a>
								</div>
								<p style="color: #666; font-size: 14px;">
									If you didn't request this email, you can safely ignore it.
								</p>
								${emailConfig.useTestEmail ? `<hr style="margin-top: 40px; border: 1px solid #eee;"/>
								<p style="color: #999; font-size: 12px;">
									${environment} mode: Originally requested for ${email}<br/>
									Sent to: ${labeledEmail}
								</p>` : ''}
							</div>
						`
					});

					if (error) {
						console.error(`❌ [${environment}] Resend API error:`, error);
						throw new Error(`Failed to send email: ${error}`);
					}

					if (emailConfig.logDetails) {
						console.log(`📧 [${environment.toUpperCase()}] Magic Link Email:`);
						console.log(`   Environment: ${environment}`);
						console.log(`   From: ${emailConfig.from}`);
						console.log(`   Original email: ${email}`);
						console.log(`   Sent to: ${labeledEmail}`);
						console.log(`   Magic link: ${url}`);
						console.log(`   Resend ID: ${data?.id}`);
					} else {
						console.log(`✅ Magic link sent (ID: ${data?.id})`);
					}
				} catch (error) {
					console.error(`❌ [${environment}] Failed to send magic link:`, error);
					throw error;
				}
			}
		})
	],
	session: {
		expiresIn: 90 * 24 * 60 * 60, // 90 days in seconds
		updateAge: 24 * 60 * 60, // Update session every 24 hours (rolling window)
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 // Cache for 5 minutes
		}
	},
	trustedOrigins: [
		// Development origins
		'http://localhost:5173',
		'https://localhost:5173',
		'http://localhost:5174',
		'https://localhost:5174',
		'http://localhost:5175',
		'https://localhost:5175',
		// Add all allowed origins from the environment
		'https://sveltekit-production-4073.up.railway.app',
	],
	logger: {
		level: 'info',
		disabled: false
	}
});