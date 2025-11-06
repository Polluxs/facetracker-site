/**
 * Development-only magic link storage
 * Stores the last generated magic link for display in the UI
 */

interface MagicLinkEntry {
	email: string;
	url: string;
	timestamp: number;
}

let lastMagicLink: MagicLinkEntry | null = null;

export function storeMagicLink(email: string, url: string): void {
	lastMagicLink = {
		email,
		url,
		timestamp: Date.now()
	};
}

export function getLastMagicLink(): MagicLinkEntry | null {
	return lastMagicLink;
}

export function clearMagicLinks(): void {
	lastMagicLink = null;
}
