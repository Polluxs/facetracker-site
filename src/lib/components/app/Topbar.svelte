<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { openAddModal } from '$lib/stores/addModal';

	let showUserMenu = $state(false);
	let menuContainer: HTMLDivElement;

	async function signOut() {
		try {
			await authClient.signOut();
			goto('/auth/login');
		} catch (err) {
			console.error('Sign out error:', err);
		}
	}

	function handleWindowClick(event: MouseEvent) {
		if (showUserMenu && menuContainer && !menuContainer.contains(event.target as Node)) {
			showUserMenu = false;
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

<header class="sticky top-0 z-40 pt-4 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="flex items-center justify-between h-14 px-5 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-lg shadow-slate-900/10">
			<!-- Logo -->
			<a href="/app" class="flex items-center gap-2">
				<div class="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
					<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
				</div>
				<span class="text-base font-semibold text-white">Facetracker</span>
			</a>

			<!-- Right side actions -->
			<div class="flex items-center gap-2">
				<!-- Add button -->
				<button
					onclick={openAddModal}
					class="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					<span class="hidden sm:inline">Add page</span>
				</button>

				<!-- Settings / User menu -->
				<div class="relative" bind:this={menuContainer}>
					<button
						onclick={() => showUserMenu = !showUserMenu}
						class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
						aria-label="Settings"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</button>

					{#if showUserMenu}
						<!-- Dropdown -->
						<div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-10">
							<a
								href="/app/settings"
								class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
								onclick={() => showUserMenu = false}
							>
								<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								Account
							</a>
							<a
								href="/app/reference"
								class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
								onclick={() => showUserMenu = false}
							>
								<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								Reference Photos
							</a>
							<div class="border-t border-slate-100 my-1"></div>
							<button
								onclick={signOut}
								class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Sign Out
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>
