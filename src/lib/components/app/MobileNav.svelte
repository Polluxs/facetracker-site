<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		href: string;
		label: string;
		icon: string;
		badge?: number;
	}

	const navItems: NavItem[] = [
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
			href: '/app/review?status=pending',
			label: 'Verify',
			icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			badge: 4
		},
		{
			href: '/app/add',
			label: 'Add',
			icon: 'M12 4v16m8-8H4'
		},
		{
			href: '/app/settings',
			label: 'More',
			icon: 'M4 6h16M4 12h16M4 18h16'
		}
	];

	function isActive(href: string): boolean {
		if (href === '/app') {
			return $page.url.pathname === '/app';
		}
		if (href === '/app/settings') {
			// "More" is active for settings, tags, reference, takedowns, coming-soon, archive
			return ['/app/settings', '/app/tags', '/app/reference', '/app/takedowns', '/app/coming-soon', '/app/archive'].some(p =>
				$page.url.pathname.startsWith(p)
			);
		}
		if (href === '/app/review?status=pending') {
			return $page.url.pathname === '/app/review' && $page.url.searchParams.get('status') === 'pending';
		}
		return $page.url.pathname.startsWith(href.split('?')[0]);
	}

	function isVerifyItem(href: string): boolean {
		return href === '/app/review?status=pending';
	}
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 lg:hidden">
	<div class="flex items-center justify-around px-2 py-2">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200
					{isVerifyItem(item.href)
						? (isActive(item.href) ? 'text-amber-600' : 'text-amber-500')
						: (isActive(item.href) ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700')}"
			>
				<div class="relative">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
					</svg>
					{#if item.badge}
						<span class="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full {isVerifyItem(item.href) ? 'bg-amber-500' : 'bg-blue-600'} text-white">
							{item.badge > 9 ? '9+' : item.badge}
						</span>
					{/if}
				</div>
				<span class="text-xs font-medium">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>
