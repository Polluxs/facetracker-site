<script lang="ts">
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let { data }: { data: PageServerData } = $props();

	let isLoading = $state(false);
	let success = $state('');
	let error = $state('');
	let isDropdownOpen = $state(false);
	let dropdownButton: HTMLButtonElement | null = $state(null);

	async function revokeAllSessions() {
		isLoading = true;
		error = '';
		success = '';

		try {
			const { data, error: revokeError } = await authClient.revokeOtherSessions();

			if (revokeError) {
				error = revokeError.message || 'Failed to revoke sessions';
			} else {
				success = '✅ All other sessions have been revoked. You remain signed in on this device.';
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

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function closeDropdown() {
		isDropdownOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownButton && !dropdownButton.contains(event.target as Node)) {
			closeDropdown();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<svelte:head>
	<title>Settings - Account Security</title>
</svelte:head>

<style>
	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.setting-card {
		transition: all 0.3s ease;
	}

	.setting-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px -8px rgba(16, 185, 129, 0.2);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dropdown-enter {
		animation: slideDown 0.2s ease-out forwards;
	}
</style>

<div class="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
		<!-- Header with Settings Cog -->
		<div class="text-center mb-12 relative">
			<h1 class="text-5xl font-bold text-gray-900 transition-all duration-200 mb-4">
				Account <span class="gradient-text">Settings</span>
			</h1>
			<p class="text-lg text-gray-600">Manage your account security and sessions</p>

			<!-- Settings Cog - positioned absolute to the right of heading -->
			<div class="absolute top-0 right-0">
				<button
					bind:this={dropdownButton}
					onclick={toggleDropdown}
					class="p-2 rounded-xl bg-white/80 hover:bg-white/90 shadow-sm border border-white/40 transition-all duration-200 hover:shadow-md"
					aria-label="Navigation menu"
				>
					<svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>

				{#if isDropdownOpen}
					<div class="absolute right-0 mt-2 w-48 rounded-xl bg-white/95 backdrop-blur-lg shadow-lg border border-white/40 overflow-hidden dropdown-enter z-50">
						<a
							href="/app"
							onclick={closeDropdown}
							class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
						>
							<svg class="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
							</svg>
							Your Insights
						</a>
						<a
							href="/app/results"
							onclick={closeDropdown}
							class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
						>
							<svg class="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
							</svg>
							View Results
						</a>
						<a
							href="/app/takedowns"
							onclick={closeDropdown}
							class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
						>
							<svg class="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
							</svg>
							View Takedowns
						</a>
						<button
							onclick={() => {
								closeDropdown();
								signOut();
							}}
							class="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors border-t border-gray-100"
						>
							<svg class="h-4 w-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							Sign Out
						</button>
					</div>
				{/if}
			</div>
		</div>

		<div class="space-y-8 max-w-4xl mx-auto">
			<!-- User Information -->
			<div class="setting-card bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg">
				<div class="mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Account Information</h2>
					<p class="text-sm text-gray-600 mt-1">
						Your account details and profile information
					</p>
				</div>
				<div class="space-y-6">
					<div>
						<p class="text-sm font-medium text-gray-900">User ID</p>
						<p class="text-gray-600 font-mono mt-1">{data.user.id}</p>
					</div>
					<div>
						<p class="text-sm font-medium text-gray-900">Email</p>
						<p class="text-gray-600 mt-1">{data.user.email}</p>
					</div>
					{#if data.user.name}
						<div>
							<p class="text-sm font-medium text-gray-900">Name</p>
							<p class="text-gray-600 mt-1">{data.user.name}</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Session Management -->
			<div class="setting-card bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg">
				<div class="mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Session Management</h2>
					<p class="text-sm text-gray-600 mt-1">
						Manage your active sessions across all devices. You'll stay logged in for up to 90 days on each device.
					</p>
				</div>

				{#if success}
					<div class="rounded-xl bg-green-50 p-4 mb-6 border border-green-200">
						<p class="text-sm text-green-800">{success}</p>
					</div>
				{/if}

				{#if error}
					<div class="rounded-xl bg-red-50 p-4 mb-6 border border-red-200">
						<p class="text-sm text-red-800">{error}</p>
					</div>
				{/if}

				<div class="space-y-6">
					<div>
						<h4 class="text-base font-semibold text-gray-900 mb-2">Revoke Other Sessions</h4>
						<p class="text-sm text-gray-600 mb-4">
							Sign out from all other devices and browsers. This won't affect your current session.
						</p>
						<Button
							onclick={revokeAllSessions}
							disabled={isLoading}
							variant="outline"
							class="bg-white hover:bg-gray-50"
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
							Revoke All Other Sessions
						</Button>
					</div>

					<div class="border-t border-gray-200 pt-6">
						<h4 class="text-base font-semibold text-gray-900 mb-2">Sign Out</h4>
						<p class="text-sm text-gray-600 mb-4">
							Sign out from this device and return to the login page.
						</p>
						<Button
							onclick={signOut}
							variant="destructive"
						>
							Sign Out
						</Button>
					</div>
				</div>
			</div>

			<!-- Security Info -->
			<div class="setting-card bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg">
				<div class="mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Security Information</h2>
				</div>
				<div class="space-y-6">
					<div>
						<p class="text-sm font-medium text-gray-900 mb-1">Session Duration</p>
						<p class="text-sm text-gray-600">You stay logged in for up to 90 days on each device</p>
					</div>
					<div>
						<p class="text-sm font-medium text-gray-900 mb-1">Rolling Sessions</p>
						<p class="text-sm text-gray-600">Your session automatically extends each time you use the app</p>
					</div>
					<div>
						<p class="text-sm font-medium text-gray-900 mb-1">Magic Links</p>
						<p class="text-sm text-gray-600">Sign in links expire after 10 minutes for security</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>