<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';

	interface NavItem {
		href: string;
		label: string;
	}

	const navItems: NavItem[] = [
		{ href: '/', label: 'Home' },
		{ href: '#features', label: 'Why' },
		{ href: '#pricing', label: 'Pricing' }
	];

	function isActiveRoute(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<style>
	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>

<header class="bg-white/60 backdrop-blur-md sticky top-0 z-50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 justify-between items-center">
			<!-- Logo/Brand -->
			<div class="flex items-center">
				<a href="/" class="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
					Facetracker
				</a>
			</div>

			<!-- Navigation -->
			<nav class="hidden md:flex space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						class="text-sm font-medium transition-all duration-200 relative group {isActiveRoute(item.href)
							? 'text-blue-600'
							: 'text-gray-600 hover:text-gray-900'}"
					>
						{item.label}
						{#if isActiveRoute(item.href)}
							<span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
						{:else}
							<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"></span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Auth Buttons -->
			<div class="flex items-center space-x-4">
				<a
					href="/auth/login"
					class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
				>
					Sign In
				</a>
				<Button href="/auth/onboarding" size="sm" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-500/20">
					Get Started
				</Button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation -->
	<div class="md:hidden border-t border-gray-200">
		<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50/80 backdrop-blur-md">
			{#each navItems as item}
				<a
					href={item.href}
					class="block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 {isActiveRoute(item.href)
						? 'text-blue-600 bg-blue-50'
						: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
				>
					{item.label}
				</a>
			{/each}
			<div class="pt-4 pb-2 border-t border-gray-200 mt-4">
				<div class="flex items-center space-x-3 px-3">
					<a
						href="/auth/login"
						class="text-sm font-medium text-gray-600 hover:text-gray-900"
					>
						Sign In
					</a>
					<Button href="/auth/onboarding" size="sm" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
						Get Started
					</Button>
				</div>
			</div>
		</div>
	</div>
</header>