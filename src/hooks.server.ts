import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth-config';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

const handleAuth: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const handleSession: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.user = session.user;
		event.locals.session = session.session;
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}

	return resolve(event);
};

const handleCacheControl: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Prevent caching of HTML pages to avoid stale hydration data
	// Only cache immutable assets (those in _app/immutable/)
	if (!event.url.pathname.startsWith('/_app/immutable/')) {
		response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
		response.headers.set('Pragma', 'no-cache');
		response.headers.set('Expires', '0');
	}

	return response;
};

export const handle: Handle = sequence(handleAuth, handleSession);