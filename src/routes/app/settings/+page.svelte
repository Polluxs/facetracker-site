<script lang="ts">
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let { data }: { data: PageServerData } = $props();

	let isLoading = $state(false);
	let success = $state('');
	let error = $state('');

	async function revokeAllSessions() {
		isLoading = true;
		error = '';
		success = '';

		try {
			const { error: revokeError } = await authClient.revokeOtherSessions();

			if (revokeError) {
				error = revokeError.message || 'Failed to revoke sessions';
			} else {
				success = 'All other sessions have been revoked. You remain signed in on this device.';
			}
		} catch (err) {
			console.error(err);
			error = 'An unexpected error occurred';
		} finally {
			isLoading = false;
		}
	}

	async function signOut() {
		try {
			await authClient.signOut();
			goto('/auth/login');
		} catch (err) {
			console.error('Sign out error:', err);
		}
	}
</script>

<svelte:head>
	<title>Settings - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Settings</h1>
		<p class="mt-1 text-slate-600">Manage your account and security</p>
	</div>

	<div class="max-w-2xl space-y-6">
		<!-- Account Information -->
		<div class="rounded-2xl bg-white border border-slate-200 p-6">
			<h2 class="text-lg font-semibold text-slate-900 mb-4">Account Information</h2>
			<div class="space-y-4">
				<div>
					<p class="text-sm text-slate-500">Email</p>
					<p class="font-medium text-slate-900">{data.user.email}</p>
				</div>
				{#if data.user.name}
					<div>
						<p class="text-sm text-slate-500">Name</p>
						<p class="font-medium text-slate-900">{data.user.name}</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Session Management -->
		<div class="rounded-2xl bg-white border border-slate-200 p-6">
			<h2 class="text-lg font-semibold text-slate-900 mb-2">Session Management</h2>
			<p class="text-sm text-slate-500 mb-4">You stay logged in for up to 90 days on each device.</p>

			{#if success}
				<div class="rounded-xl bg-emerald-50 border border-emerald-100 p-4 mb-4">
					<div class="flex items-center gap-2">
						<svg class="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<p class="text-sm text-emerald-800">{success}</p>
					</div>
				</div>
			{/if}

			{#if error}
				<div class="rounded-xl bg-red-50 border border-red-100 p-4 mb-4">
					<p class="text-sm text-red-800">{error}</p>
				</div>
			{/if}

			<div class="space-y-4">
				<div>
					<p class="text-sm font-medium text-slate-700 mb-2">Revoke Other Sessions</p>
					<p class="text-sm text-slate-500 mb-3">Sign out from all other devices and browsers.</p>
					<button
						onclick={revokeAllSessions}
						disabled={isLoading}
						class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center gap-2"
					>
						{#if isLoading}
							<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						{/if}
						Revoke All Other Sessions
					</button>
				</div>

				<div class="border-t border-slate-100 pt-4">
					<p class="text-sm font-medium text-slate-700 mb-2">Sign Out</p>
					<p class="text-sm text-slate-500 mb-3">Sign out from this device.</p>
					<button
						onclick={signOut}
						class="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>

		<!-- Security Info -->
		<div class="rounded-2xl bg-slate-50 border border-slate-200 p-6">
			<h2 class="text-lg font-semibold text-slate-900 mb-4">Security</h2>
			<div class="space-y-3 text-sm">
				<div class="flex items-start gap-3">
					<svg class="h-5 w-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
					<div>
						<p class="font-medium text-slate-700">Magic Link Authentication</p>
						<p class="text-slate-500">Sign in links expire after 10 minutes for security</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<svg class="h-5 w-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					<div>
						<p class="font-medium text-slate-700">Rolling Sessions</p>
						<p class="text-slate-500">Your session automatically extends each time you use the app</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
