<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	let isLoading = false;
	let email = '';
	let error = '';
	let success = '';
	let devMagicLink: string | null = null;
	let devMagicLinkEmail: string | null = null;

	async function fetchDevMagicLink() {
		if (!dev) return;

		try {
			const response = await fetch('/api/dev/magic-link');
			const data = await response.json();

			if (data.magicLink) {
				devMagicLink = data.magicLink.url;
				devMagicLinkEmail = data.magicLink.email;
			}
		} catch (err) {
			console.error('Failed to fetch dev magic link:', err);
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		success = '';
		devMagicLink = null;
		devMagicLinkEmail = null;
		isLoading = true;

		try {
			const result = await authClient.signIn.magicLink({
				email,
				callbackURL: '/app'
			});

			if (result.error) {
				error = result.error.message || 'Failed to send magic link';
			} else {
				success = `📧 Check your email! We've sent a magic link to ${email}. Click the link to sign in instantly.`;

				// Fetch the magic link in development mode
				if (dev) {
					setTimeout(fetchDevMagicLink, 500);
				}
			}
		} catch (err) {
			console.error(err);

			// Check if it's a fetch error (like ERR_EMPTY_RESPONSE)
			if (err instanceof TypeError && err.message.includes('fetch')) {
				error = dev
					? 'Cannot connect to authentication service. Please ensure the database is running with: pnpm run db:start'
					: 'Authentication service temporarily unavailable';
			} else if (err instanceof Error && err.message.includes('DATABASE_CONNECTION_ERROR')) {
				error = dev
					? 'Database connection failed. Please ensure the database is running with: pnpm run db:start'
					: 'Authentication service temporarily unavailable';
			} else {
				error = 'An unexpected error occurred';
			}
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		if (dev) {
			fetchDevMagicLink();
		}
	});
</script>

<svelte:head>
	<title>Sign In - Facetracker</title>
</svelte:head>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.animate-fade-in {
		animation: fadeIn 0.8s ease-out forwards;
	}

	.delay-100 {
		animation-delay: 0.1s;
		opacity: 0;
	}

	.delay-200 {
		animation-delay: 0.2s;
		opacity: 0;
	}

	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.4;
		animation: blob 7s infinite;
	}

	@keyframes blob {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}
</style>

<div class="min-h-screen bg-white">
	<!-- Sign In Section -->
	<section class="relative overflow-hidden">
		<!-- Animated background blobs -->
		<div class="blob top-20 left-20 w-72 h-72 bg-blue-400" style="animation-delay: 0s;"></div>
		<div class="blob top-40 right-20 w-96 h-96 bg-purple-400" style="animation-delay: 2s;"></div>
		<div class="blob bottom-20 left-1/3 w-80 h-80 bg-cyan-400" style="animation-delay: 4s;"></div>

		<div class="relative flex min-h-screen items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
			<div class="w-full max-w-md space-y-8">
				<div class="text-center animate-fade-in-up">
					<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Welcome <span class="gradient-text">Back</span>
					</h1>
					<p class="mt-4 text-lg text-gray-600">
						Sign in to access your account
					</p>
				</div>

				<div class="p-10 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl shadow-blue-500/10 animate-fade-in-up delay-100">
					<form onsubmit={handleSubmit} class="space-y-6">
						<div class="space-y-2">
							<Label for="email" class="text-gray-900 font-medium">Email</Label>
							<Input
								id="email"
								type="email"
								bind:value={email}
								placeholder="john@example.com"
								required
								disabled={isLoading}
								class="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
							/>
						</div>

						{#if error}
							<div class="rounded-xl bg-red-50 border-2 border-red-100 p-4">
								<p class="text-sm text-red-800">{error}</p>
							</div>
						{/if}

						{#if success}
							<div class="rounded-xl bg-green-50 border-2 border-green-100 p-4">
								<p class="text-sm text-green-800">{success}</p>
							</div>
						{/if}

						<Button
							type="submit"
							class="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 text-base font-medium"
							disabled={isLoading}
						>
							{#if isLoading}
								<span class="mr-2">
									<svg
										class="h-4 w-4 animate-spin"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</span>
							{/if}
							Send Magic Link
						</Button>
					</form>

					<div class="mt-6 text-center space-y-3">
						<p class="text-sm text-gray-600">
							Don't have an account?
							<a
								href="/auth/onboarding"
								class="font-medium text-blue-600 hover:text-purple-600 transition-colors"
							>
								Create one
							</a>
						</p>
						<p class="text-sm">
							<a
								href="/"
								class="font-medium text-gray-500 hover:text-gray-900 transition-colors"
							>
								← Back to Home
							</a>
						</p>
					</div>
				</div>

				{#if dev}
					<div class="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100/50 p-6 text-sm animate-fade-in delay-200">
						<h4 class="font-semibold text-blue-900 mb-3">🧪 Test Environment</h4>
						<p class="text-blue-700 mb-3">
							Following Resend best practices for safe email testing.
						</p>
						<ul class="text-blue-600 space-y-2">
							<li>• <strong>Development:</strong> Emails sent to <code class="bg-blue-100/70 px-2 py-0.5 rounded">delivered@resend.dev</code></li>
							<li>• <strong>Staging:</strong> Configure with <code class="bg-blue-100/70 px-2 py-0.5 rounded">STAGING_TEST_EMAIL</code></li>
							<li>• <strong>Production:</strong> Emails sent to real addresses</li>
							<li>• Check server console for magic link URLs</li>
						</ul>

						{#if devMagicLink && devMagicLinkEmail}
							<div class="mt-4 pt-4 border-t border-blue-200">
								<p class="text-blue-700 mb-2">
									<strong>Latest magic link for:</strong> <code class="bg-blue-100/70 px-2 py-0.5 rounded">{devMagicLinkEmail}</code>
								</p>
								<a
									href={devMagicLink}
									class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
								>
									Click here to login
								</a>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</section>
</div>