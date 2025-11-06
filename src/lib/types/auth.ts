export interface BetterAuthUser {
	id: string;
	email: string;
	emailVerified: boolean;
	name: string | null;
	createdAt: Date;
	updatedAt: Date;
	image?: string | null;
}

export interface BetterAuthSession {
	id: string;
	userId: string;
	expiresAt: Date;
	token: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface EmailVerificationUser {
	email: string;
	name?: string | null;
}

export interface EmailVerificationResult {
	data?: {
		user: EmailVerificationUser;
	} | null;
	error?: {
		message: string;
		code?: string;
	} | null;
}

export interface VerificationPageData {
	status: 'success' | 'error';
	message: string;
}