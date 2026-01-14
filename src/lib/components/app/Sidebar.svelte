<script lang="ts">
	import { page } from '$app/stores';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	interface NavItem {
		href: string;
		label: string;
		icon: string;
		badge?: number;
	}

	// Count of images to verify (mock data)
	const toVerifyCount = 4;

	const mainNav: NavItem[] = [
		{
			href: '/app',
			label: 'Overview',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			href: '/app/timeline',
			label: 'Timeline',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			href: '/app/results',
			label: 'Your Pages',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		}
	];

	let imagesExpanded = $state(true);

	const imagesSubNav = [
		{ href: '/app/review', label: 'All', status: 'all', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
		{ href: '/app/review?status=confirmed', label: 'Verified', status: 'confirmed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
		{ href: '/app/review?status=rejected', label: 'Not me', status: 'rejected', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' }
	];


	const bottomNav: NavItem[] = [
		{
			href: '/app/collections',
			label: 'Collections',
			icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
		},
		{
			href: '/app/archive',
			label: 'Screenshots',
			icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z'
		}
	];

	let settingsExpanded = $state(false);

	const settingsSubNav = [
		{ href: '/app/settings', label: 'Account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
		{ href: '/app/reference', label: 'Reference Photos', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' }
	];

	const extraNav: NavItem[] = [
		{
			href: '/app/takedowns',
			label: 'Takedowns',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		},
		{
			href: '/app/coming-soon',
			label: 'Coming Soon',
			icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
		}
	];

	function isActive(href: string): boolean {
		if (href === '/app') {
			return $page.url.pathname === '/app';
		}
		return $page.url.pathname.startsWith(href.split('?')[0]);
	}

	function isToVerifyActive(): boolean {
		return $page.url.pathname === '/app/review' && $page.url.searchParams.get('status') === 'pending';
	}

	function isImagesActive(): boolean {
		return $page.url.pathname.startsWith('/app/review');
	}

	function isImageSubActive(status: string): boolean {
		if (!$page.url.pathname.startsWith('/app/review')) return false;
		const urlStatus = $page.url.searchParams.get('status') || 'all';
		return urlStatus === status;
	}

	function isSettingsActive(): boolean {
		return $page.url.pathname.startsWith('/app/settings') || $page.url.pathname.startsWith('/app/reference');
	}

	function isSettingsSubActive(href: string): boolean {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
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

<aside class="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-slate-200 hidden lg:block">
	<div class="flex h-full flex-col">
		<!-- Logo -->
		<div class="flex h-16 items-center px-6 border-b border-slate-100">
			<a href="/app" class="flex items-center gap-2">
				<div class="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
					<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
				</div>
				<span class="text-lg font-bold text-slate-900">Facetracker</span>
			</a>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 overflow-y-auto px-4 py-6">
			<!-- Add Page Button -->
			<a
				href="/app/add"
				class="flex items-center justify-center gap-2 w-full px-4 py-2.5 mb-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Add page
			</a>

			<!-- To Verify - Highlighted Action -->
			{#if toVerifyCount > 0}
				<a
					href="/app/review?status=pending"
					class="flex items-center justify-between w-full px-4 py-2.5 mb-6 rounded-xl transition-colors
						{isToVerifyActive()
							? 'bg-amber-500 text-white'
							: 'bg-amber-100 hover:bg-amber-200 text-amber-800'}"
				>
					<div class="flex items-center gap-2">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span class="text-sm font-medium">To Verify</span>
					</div>
					<span class="px-2 py-0.5 text-xs font-bold rounded-full {isToVerifyActive() ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-800'}">
						{toVerifyCount}
					</span>
				</a>
			{/if}

			<!-- Main Nav -->
			<div class="space-y-1">
				{#each mainNav as item}
					<a
						href={item.href}
						class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
							{isActive(item.href)
								? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
								: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
					>
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 {isActive(item.href) ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
							</svg>
							<span>{item.label}</span>
						</div>
						{#if item.badge}
							<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
								{item.badge}
							</span>
						{/if}
					</a>
				{/each}

				<!-- Unique Images with dropdown -->
				<div>
					<button
						onclick={() => imagesExpanded = !imagesExpanded}
						class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
							{isImagesActive()
								? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
								: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
					>
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 {isImagesActive() ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span>Unique Images</span>
						</div>
						<svg
							class="h-4 w-4 text-slate-400 transition-transform {imagesExpanded ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if imagesExpanded}
						<div class="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1">
							{#each imagesSubNav as sub}
								<a
									href={sub.href}
									class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
										{isImageSubActive(sub.status)
											? 'bg-slate-100 text-slate-900 font-medium'
											: 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}"
								>
									<svg class="h-4 w-4 {isImageSubActive(sub.status) ? 'text-slate-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sub.icon} />
									</svg>
									<span>{sub.label}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				{#each bottomNav as item}
					<a
						href={item.href}
						class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
							{isActive(item.href)
								? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
								: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
					>
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 {isActive(item.href) ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
							</svg>
							<span>{item.label}</span>
						</div>
					</a>
				{/each}
			</div>

			<!-- Divider -->
			<div class="my-6 border-t border-slate-100"></div>

			<!-- Extra Nav -->
			<div class="space-y-1">
				{#each extraNav as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
							{isActive(item.href)
								? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
								: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
					>
						<svg class="h-5 w-5 {isActive(item.href) ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
						</svg>
						<span>{item.label}</span>
						{#if item.label === 'Coming Soon'}
							<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-purple-100 text-purple-700">NEW</span>
						{/if}
					</a>
				{/each}
			</div>
		</nav>

		<!-- Footer -->
		<div class="border-t border-slate-100 p-4">
			<!-- Settings with dropdown -->
			<div>
				<button
					onclick={() => settingsExpanded = !settingsExpanded}
					class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
						{isSettingsActive()
							? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
							: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
				>
					<div class="flex items-center gap-3">
						<svg class="h-5 w-5 {isSettingsActive() ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span>Settings</span>
					</div>
					<svg
						class="h-4 w-4 text-slate-400 transition-transform {settingsExpanded ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if settingsExpanded}
					<div class="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1">
						{#each settingsSubNav as sub}
							<a
								href={sub.href}
								class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
									{isSettingsSubActive(sub.href)
										? 'bg-slate-100 text-slate-900 font-medium'
										: 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}"
							>
								<svg class="h-4 w-4 {isSettingsSubActive(sub.href) ? 'text-slate-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sub.icon} />
								</svg>
								<span>{sub.label}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<button
				onclick={signOut}
				class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-1"
			>
				<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
				</svg>
				<span>Sign Out</span>
			</button>
		</div>
	</div>
</aside>
