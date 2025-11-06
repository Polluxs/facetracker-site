import { auth } from '$lib/server/auth-config';
import type { PageServerLoad } from './$types';
import type { EmailVerificationResult, VerificationPageData } from '$lib/types/auth';

export const load: PageServerLoad = async ({ url, request }): Promise<VerificationPageData> => {
	const token = url.searchParams.get('token');

	if (!token) {
		return {
			status: 'error',
			message: 'Invalid verification link'
		};
	}

	try {
		const result = await auth.api.verifyEmail({
			headers: request.headers,
			query: { token }
		}) as EmailVerificationResult;

		if (result.data) {
			return {
				status: 'success',
				message: 'Your email has been verified successfully!'
			};
		} else {
			return {
				status: 'error',
				message: result.error?.message || 'Verification failed'
			};
		}
	} catch (error) {
		console.error('Email verification error:', error);
		return {
			status: 'error',
			message: 'An unexpected error occurred'
		};
	}
};