import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getLastMagicLink } from '$lib/server/dev-magic-links';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// Only allow in development mode
	if (env.ENVIRONMENT !== 'development') {
		return json({ error: 'Not available in production' }, { status: 403 });
	}

	const magicLink = getLastMagicLink();

	if (!magicLink) {
		return json({ magicLink: null });
	}

	return json({
		magicLink: {
			email: magicLink.email,
			url: magicLink.url,
			timestamp: magicLink.timestamp
		}
	});
};
