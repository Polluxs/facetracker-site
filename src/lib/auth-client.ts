import { createAuthClient } from 'better-auth/svelte';
import { magicLinkClient } from 'better-auth/client/plugins';
import { browser } from '$app/environment';

export const authClient = createAuthClient({
	baseURL: browser ? window.location.origin : 'http://localhost:5173',
	plugins: [magicLinkClient()],
	fetchOptions: {
		onError(context) {
			console.error('Auth error:', context);
		}
	}
});