<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	type TabId = 'overview' | 'growth' | 'images' | 'websites';

	interface Tab {
		id: TabId;
		label: string;
		bgGradient: string;
		accentColor: string;
	}

	const tabs: Tab[] = [
		{ id: 'overview', label: 'Overview', bgGradient: 'from-blue-50 to-cyan-50', accentColor: 'from-blue-500 to-cyan-500' },
		{ id: 'growth', label: 'Growth & Location', bgGradient: 'from-purple-50 to-indigo-50', accentColor: 'from-purple-500 to-indigo-500' },
		{ id: 'images', label: 'Image Types', bgGradient: 'from-cyan-50 to-teal-50', accentColor: 'from-cyan-500 to-teal-500' },
		{ id: 'websites', label: 'Website Types', bgGradient: 'from-pink-50 to-purple-50', accentColor: 'from-pink-500 to-purple-500' }
	];

	let activeTab = $state<TabId>('overview');
	let isTransitioning = $state(false);
	let isDropdownOpen = $state(false);
	let dropdownButton: HTMLButtonElement | null = $state(null);

	function switchTab(tabId: TabId) {
		if (tabId === activeTab) return;

		isTransitioning = true;
		setTimeout(() => {
			activeTab = tabId;
			setTimeout(() => {
				isTransitioning = false;
			}, 50);
		}, 150);
	}

	function getCurrentTab(): Tab {
		return tabs.find(t => t.id === activeTab) ?? tabs[0];
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

	// Mockup data
	const overviewStats = [
		{ label: 'Images Found', value: '247', change: '+12 this week', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
		{ label: 'Takedown Requests', value: '23', change: '8 pending', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
		{ label: 'Websites Monitored', value: '52', change: '+3 new', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }
	];

	const recentFinds = [
		{ site: 'example-blog.com', date: '2 hours ago', status: 'new' },
		{ site: 'photo-sharing.net', date: '5 hours ago', status: 'pending' },
		{ site: 'news-site.org', date: '1 day ago', status: 'removed' }
	];

	const growthData = [
		{ month: 'Jan', count: 45 },
		{ month: 'Feb', count: 67 },
		{ month: 'Mar', count: 89 },
		{ month: 'Apr', count: 123 },
		{ month: 'May', count: 156 },
		{ month: 'Jun', count: 247 }
	];

	const locationData = [
		{ region: 'North America', count: 98, percentage: 40 },
		{ region: 'Europe', count: 74, percentage: 30 },
		{ region: 'Asia', count: 49, percentage: 20 },
		{ region: 'Other', count: 26, percentage: 10 }
	];

	const imageTypes = [
		{ type: 'Profile Photos', count: 89, percentage: 36 },
		{ type: 'Social Media Posts', count: 67, percentage: 27 },
		{ type: 'Event Photography', count: 54, percentage: 22 },
		{ type: 'Professional Headshots', count: 37, percentage: 15 }
	];

	const websiteTypes = [
		{ type: 'Social Networks', count: 112, percentage: 45 },
		{ type: 'Blogs & News', count: 67, percentage: 27 },
		{ type: 'Professional Sites', count: 43, percentage: 17 },
		{ type: 'Forums & Communities', count: 25, percentage: 11 }
	];
</script>

<svelte:head>
	<title>Dashboard - Facetracker</title>
</svelte:head>

<style>
	@keyframes fadeInScale {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.tab-content-enter {
		animation: fadeInScale 0.3s ease-out forwards;
	}

	.tab-content-exit {
		animation: fadeOut 0.15s ease-out forwards;
	}

	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-card {
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px -8px rgba(59, 130, 246, 0.2);
	}

	.bar {
		transition: all 0.6s ease;
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

<div class="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
		<!-- Header with Settings Cog -->
		<div class="text-center mb-12 relative">
			<a
				href="/app/results"
				class="inline-block mb-4 group cursor-pointer"
				title="Switch to Results view"
			>
				<h1 class="text-5xl font-bold text-gray-900 transition-all duration-200 group-hover:scale-105">
					Your <span class="gradient-text group-hover:opacity-80 transition-opacity">Insights</span>
				</h1>
			</a>
			<p class="text-lg text-gray-600">Track your digital presence across the web</p>

			<!-- Settings Cog - positioned absolute to the right of heading -->
			<div class="absolute top-0 right-0">
				<button
					bind:this={dropdownButton}
					onclick={toggleDropdown}
					class="p-2 rounded-xl bg-white/80 hover:bg-white/90 shadow-sm border border-white/40 transition-all duration-200 hover:shadow-md"
					aria-label="Settings menu"
				>
					<svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
				</button>

				{#if isDropdownOpen}
					<div class="absolute right-0 mt-2 w-48 rounded-xl bg-white/95 backdrop-blur-lg shadow-lg border border-white/40 overflow-hidden dropdown-enter z-50">
						<a
							href="/app/results"
							onclick={closeDropdown}
							class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
						<a
							href="/app/settings"
							onclick={closeDropdown}
							class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
						>
							<svg class="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							Settings
						</a>
						<button
							onclick={() => {
								closeDropdown();
								signOut();
							}}
							class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
						>
							<svg class="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							Sign Out
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- Tab Navigation -->
		<div class="flex justify-center mb-12">
			<div class="inline-flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur-sm p-2 shadow-lg border border-white/40">
				{#each tabs as tab}
					<button
						onclick={() => switchTab(tab.id)}
						class="relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-900'}"
					>
						{#if activeTab === tab.id}
							<div class="absolute inset-0 rounded-xl bg-gradient-to-r {tab.accentColor} transition-all duration-300"></div>
						{/if}
						<span class="relative z-10">{tab.label}</span>
					</button>
				{/each}

				<!-- Divider -->
				<div class="h-8 w-px bg-gray-300"></div>

				<!-- Switch to Results Icon -->
				<a
					href="/app/results"
					class="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
					title="Switch to Results view"
					aria-label="Switch to Results view"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
					</svg>
				</a>
			</div>
		</div>

		<!-- Tab Content -->
		<div class="relative">
			<div class="{isTransitioning ? 'tab-content-exit' : 'tab-content-enter'}">
				{#if activeTab === 'overview'}
					<div class="space-y-8">
						<!-- Stats Grid -->
						<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
							{#each overviewStats as stat}
								<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
									<div class="flex items-start justify-between">
										<div>
											<p class="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
											<p class="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
											<p class="text-sm text-blue-600">{stat.change}</p>
										</div>
										<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
											<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={stat.icon}></path>
											</svg>
										</div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Simple Bar Chart -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<h3 class="text-xl font-bold text-gray-900 mb-6">Growth Over Time</h3>
							<div class="flex items-end justify-between h-64 gap-4">
								{#each growthData as data}
									<div class="flex-1 flex flex-col items-center gap-3">
										<div class="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg bar" style="height: {(data.count / 247) * 100}%"></div>
										<div class="text-center">
											<p class="text-sm font-semibold text-gray-900">{data.count}</p>
											<p class="text-xs text-gray-500">{data.month}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Recent Finds -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<div class="flex items-center justify-between mb-6">
								<h3 class="text-xl font-bold text-gray-900">Recent Finds</h3>
								<Button href="/app/results" class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
									View All Results
								</Button>
							</div>
							<div class="space-y-4">
								{#each recentFinds as find}
									<div class="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
										<div class="flex items-center gap-4">
											<div class="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
												<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
												</svg>
											</div>
											<div>
												<p class="font-semibold text-gray-900">{find.site}</p>
												<p class="text-sm text-gray-500">{find.date}</p>
											</div>
										</div>
										<span class="px-3 py-1 rounded-full text-sm font-medium {find.status === 'new' ? 'bg-blue-100 text-blue-700' : find.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}">
											{find.status}
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else if activeTab === 'growth'}
					<div class="space-y-8">
						<!-- Growth Stats -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<h3 class="text-lg font-semibold text-gray-900 mb-4">Total Growth</h3>
								<p class="text-5xl font-bold text-gray-900 mb-2">+448%</p>
								<p class="text-sm text-purple-600">Since first scan in January</p>
							</div>
							<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<h3 class="text-lg font-semibold text-gray-900 mb-4">Average Monthly Growth</h3>
								<p class="text-5xl font-bold text-gray-900 mb-2">+34</p>
								<p class="text-sm text-purple-600">New images per month</p>
							</div>
						</div>

						<!-- Location Breakdown -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<h3 class="text-xl font-bold text-gray-900 mb-6">Geographic Distribution</h3>
							<div class="space-y-6">
								{#each locationData as location}
									<div>
										<div class="flex items-center justify-between mb-2">
											<span class="font-semibold text-gray-900">{location.region}</span>
											<span class="text-sm text-gray-600">{location.count} images ({location.percentage}%)</span>
										</div>
										<div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
											<div class="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000" style="width: {location.percentage}%"></div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Trend Analysis -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<h3 class="text-xl font-bold text-gray-900 mb-4">Popularity Trend</h3>
							<p class="text-gray-600 mb-6">Your online presence has grown significantly over the past 6 months, with the strongest growth in April and May.</p>
							<div class="flex items-center gap-2 text-sm text-purple-600">
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
								</svg>
								<span class="font-semibold">Trending upward</span>
							</div>
						</div>
					</div>
				{:else if activeTab === 'images'}
					<div class="space-y-8">
						<!-- Image Categories -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<h3 class="text-xl font-bold text-gray-900 mb-6">Image Categories</h3>
							<div class="space-y-6">
								{#each imageTypes as imageType}
									<div>
										<div class="flex items-center justify-between mb-2">
											<span class="font-semibold text-gray-900">{imageType.type}</span>
											<span class="text-sm text-gray-600">{imageType.count} images ({imageType.percentage}%)</span>
										</div>
										<div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
											<div class="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-1000" style="width: {imageType.percentage}%"></div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Insights -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<h3 class="text-lg font-semibold text-gray-900 mb-4">Most Common Type</h3>
								<p class="text-3xl font-bold text-gray-900 mb-2">Profile Photos</p>
								<p class="text-sm text-cyan-600">36% of all found images</p>
							</div>
							<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<h3 class="text-lg font-semibold text-gray-900 mb-4">Image Quality</h3>
								<p class="text-3xl font-bold text-gray-900 mb-2">High-Res</p>
								<p class="text-sm text-cyan-600">78% are high quality images</p>
							</div>
						</div>
					</div>
				{:else if activeTab === 'websites'}
					<div class="space-y-8">
						<!-- Website Categories -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<h3 class="text-xl font-bold text-gray-900 mb-6">Website Categories</h3>
							<div class="space-y-6">
								{#each websiteTypes as websiteType}
									<div>
										<div class="flex items-center justify-between mb-2">
											<span class="font-semibold text-gray-900">{websiteType.type}</span>
											<span class="text-sm text-gray-600">{websiteType.count} occurrences ({websiteType.percentage}%)</span>
										</div>
										<div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
											<div class="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000" style="width: {websiteType.percentage}%"></div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Top Sites -->
						<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
							<h3 class="text-xl font-bold text-gray-900 mb-6">Top 5 Websites</h3>
							<div class="space-y-4">
								{#each ['facebook.com', 'linkedin.com', 'instagram.com', 'twitter.com', 'company-blog.io'] as site, i}
									<div class="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
										<div class="flex items-center gap-4">
											<span class="text-2xl font-bold text-gray-300">#{i + 1}</span>
											<span class="font-semibold text-gray-900">{site}</span>
										</div>
										<span class="text-sm font-medium text-gray-600">{[45, 38, 29, 23, 18][i]} images</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Domain Authority -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<h3 class="text-lg font-semibold text-gray-900 mb-4">High Authority Sites</h3>
								<p class="text-3xl font-bold text-gray-900 mb-2">34</p>
								<p class="text-sm text-pink-600">Reputable websites using your images</p>
							</div>
							<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<h3 class="text-lg font-semibold text-gray-900 mb-4">Flagged Sites</h3>
								<p class="text-3xl font-bold text-gray-900 mb-2">8</p>
								<p class="text-sm text-pink-600">Sites requiring attention</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
