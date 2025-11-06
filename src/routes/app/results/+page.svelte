<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	type ViewMode = 'list' | 'images' | 'tagged';
	type ResultStatus = 'new' | 'pending' | 'removed';

	interface Result {
		id: string;
		site: string;
		url: string;
		foundDate: string;
		status: ResultStatus;
		imageType: string;
		websiteCategory: string;
		imageId: string;
		tags: string[];
	}

	interface Tag {
		id: string;
		name: string;
		color: string;
		isCustom: boolean;
	}

	let activeView = $state<ViewMode>('list');
	let isTransitioning = $state(false);
	let isDropdownOpen = $state(false);
	let dropdownButton: HTMLButtonElement | null = $state(null);
	let selectedFilter = $state<'all' | ResultStatus>('all');
	let isAddingTag = $state(false);
	let newTagName = $state('');
	let newTagColor = $state('#3b82f6');
	let selectedResultForTag: string | null = $state(null);

	function switchView(viewMode: ViewMode) {
		if (viewMode === activeView) return;

		isTransitioning = true;
		setTimeout(() => {
			activeView = viewMode;
			setTimeout(() => {
				isTransitioning = false;
			}, 50);
		}, 150);
	}

	const predefinedTags: Tag[] = [
		{ id: 'important', name: 'Important', color: '#ef4444', isCustom: false },
		{ id: 'review', name: 'Review Later', color: '#f59e0b', isCustom: false },
		{ id: 'ignore', name: 'Ignore', color: '#6b7280', isCustom: false },
		{ id: 'personal', name: 'Personal', color: '#8b5cf6', isCustom: false },
		{ id: 'professional', name: 'Professional', color: '#3b82f6', isCustom: false }
	];

	let customTags = $state<Tag[]>([]);
	let allTags = $derived([...predefinedTags, ...customTags]);

	const mockResults: Result[] = [
		{ id: '1', site: 'example-blog.com', url: 'https://example-blog.com/post/123', foundDate: '2 hours ago', status: 'new', imageType: 'Profile Photo', websiteCategory: 'Blog', imageId: 'img1', tags: [] },
		{ id: '2', site: 'photo-sharing.net', url: 'https://photo-sharing.net/gallery/456', foundDate: '5 hours ago', status: 'pending', imageType: 'Social Media Post', websiteCategory: 'Social Network', imageId: 'img2', tags: [] },
		{ id: '3', site: 'news-site.org', url: 'https://news-site.org/article/789', foundDate: '1 day ago', status: 'removed', imageType: 'Event Photography', websiteCategory: 'News', imageId: 'img1', tags: [] },
		{ id: '4', site: 'forum-discussion.com', url: 'https://forum-discussion.com/thread/321', foundDate: '2 days ago', status: 'new', imageType: 'Profile Photo', websiteCategory: 'Forum', imageId: 'img3', tags: [] },
		{ id: '5', site: 'business-directory.co', url: 'https://business-directory.co/profile/654', foundDate: '3 days ago', status: 'pending', imageType: 'Professional Headshot', websiteCategory: 'Professional', imageId: 'img1', tags: [] },
		{ id: '6', site: 'community-site.io', url: 'https://community-site.io/user/987', foundDate: '4 days ago', status: 'new', imageType: 'Social Media Post', websiteCategory: 'Community', imageId: 'img4', tags: [] },
		{ id: '7', site: 'tech-blog.dev', url: 'https://tech-blog.dev/author/111', foundDate: '5 days ago', status: 'removed', imageType: 'Profile Photo', websiteCategory: 'Blog', imageId: 'img2', tags: [] },
		{ id: '8', site: 'portfolio-site.com', url: 'https://portfolio-site.com/team/222', foundDate: '1 week ago', status: 'pending', imageType: 'Professional Headshot', websiteCategory: 'Professional', imageId: 'img5', tags: [] },
		{ id: '9', site: 'social-network.app', url: 'https://social-network.app/posts/333', foundDate: '1 week ago', status: 'new', imageType: 'Event Photography', websiteCategory: 'Social Network', imageId: 'img3', tags: [] },
		{ id: '10', site: 'magazine-online.com', url: 'https://magazine-online.com/feature/444', foundDate: '2 weeks ago', status: 'removed', imageType: 'Event Photography', websiteCategory: 'News', imageId: 'img4', tags: [] },
		{ id: '11', site: 'startup-hub.io', url: 'https://startup-hub.io/founders/555', foundDate: '2 weeks ago', status: 'new', imageType: 'Professional Headshot', websiteCategory: 'Professional', imageId: 'img5', tags: [] },
		{ id: '12', site: 'creative-commons.org', url: 'https://creative-commons.org/photos/666', foundDate: '3 weeks ago', status: 'pending', imageType: 'Social Media Post', websiteCategory: 'Community', imageId: 'img6', tags: [] }
	];

	let results = $state(mockResults);

	interface GroupedImage {
		imageId: string;
		count: number;
		results: Result[];
		firstResult: Result;
	}

	function getFilteredResults(): Result[] {
		if (selectedFilter === 'all') return results;
		return results.filter(r => r.status === selectedFilter);
	}

	function getGroupedImages(): GroupedImage[] {
		const filtered = getFilteredResults();
		const groups = new Map<string, Result[]>();

		filtered.forEach(result => {
			const existing = groups.get(result.imageId) ?? [];
			existing.push(result);
			groups.set(result.imageId, existing);
		});

		return Array.from(groups.entries()).map(([imageId, results]) => ({
			imageId,
			count: results.length,
			results,
			firstResult: results[0]
		}));
	}

	function getResultsByTag(): Map<string, Result[]> {
		const tagMap = new Map<string, Result[]>();

		// Group results by each tag they have
		results.forEach(result => {
			if (result.tags.length === 0) {
				const untagged = tagMap.get('untagged') ?? [];
				untagged.push(result);
				tagMap.set('untagged', untagged);
			} else {
				result.tags.forEach(tagId => {
					const tagged = tagMap.get(tagId) ?? [];
					tagged.push(result);
					tagMap.set(tagId, tagged);
				});
			}
		});

		return tagMap;
	}

	function addCustomTag() {
		if (!newTagName.trim()) return;

		const newTag: Tag = {
			id: `custom-${Date.now()}`,
			name: newTagName.trim(),
			color: newTagColor,
			isCustom: true
		};

		customTags = [...customTags, newTag];
		newTagName = '';
		newTagColor = '#3b82f6';
		isAddingTag = false;
	}

	function toggleTag(resultId: string, tagId: string) {
		results = results.map(r => {
			if (r.id !== resultId) return r;

			const hasTag = r.tags.includes(tagId);
			return {
				...r,
				tags: hasTag ? r.tags.filter(t => t !== tagId) : [...r.tags, tagId]
			};
		});
	}

	function getTagById(tagId: string): Tag | undefined {
		return allTags.find(t => t.id === tagId);
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
	<title>Your Results - Facetracker</title>
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

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
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

	.animate-fade-in {
		animation: fadeInScale 0.6s ease-out forwards;
		opacity: 0;
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.4s ease-out forwards;
		opacity: 0;
	}

	.delay-100 {
		animation-delay: 0.1s;
	}

	.delay-200 {
		animation-delay: 0.2s;
	}

	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.result-card {
		transition: all 0.3s ease;
	}

	.result-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px -8px rgba(59, 130, 246, 0.3);
	}

	.image-card {
		transition: all 0.3s ease;
	}

	.image-card:hover {
		transform: scale(1.02);
		box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.4);
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

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
		<!-- Header with Settings Cog -->
		<div class="text-center mb-12 relative">
			<a
				href="/app/takedowns"
				class="inline-block mb-4 group cursor-pointer"
				title="Switch to Takedowns view"
			>
				<h1 class="text-5xl font-bold text-gray-900 transition-all duration-200 group-hover:scale-105">
					Your <span class="gradient-text group-hover:opacity-80 transition-opacity">Results</span>
				</h1>
			</a>
			<p class="text-lg text-gray-600">Manage and organize your found images</p>

			<!-- Settings Cog -->
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
							href="/app"
							onclick={closeDropdown}
							class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
						>
							<svg class="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
							</svg>
							View Insights
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

		<!-- View Tabs -->
		<div class="flex justify-center mb-12">
			<div class="inline-flex items-center rounded-2xl bg-white/80 backdrop-blur-sm p-2 shadow-lg border border-white/40 gap-2">
				<button
					onclick={() => switchView('list')}
					class="relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeView === 'list' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}"
				>
					{#if activeView === 'list'}
						<div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"></div>
					{/if}
					<span class="relative z-10">List View</span>
				</button>
				<button
					onclick={() => switchView('images')}
					class="relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeView === 'images' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}"
				>
					{#if activeView === 'images'}
						<div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"></div>
					{/if}
					<span class="relative z-10">Image Cards</span>
				</button>
				<button
					onclick={() => switchView('tagged')}
					class="relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeView === 'tagged' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}"
				>
					{#if activeView === 'tagged'}
						<div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"></div>
					{/if}
					<span class="relative z-10">Tagged</span>
				</button>

				<!-- Divider -->
				<div class="h-8 w-px bg-gray-300"></div>

				<!-- Switch to Insights Icon -->
				<a
					href="/app"
					class="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
					title="Switch to Insights view"
					aria-label="Switch to Insights view"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
					</svg>
				</a>
			</div>
		</div>

		<!-- Content based on active view -->
		<div class="relative">
			<div class="{isTransitioning ? 'tab-content-exit' : 'tab-content-enter'}">
			{#if activeView === 'list'}
				<!-- Stats Summary -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
					<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
						<div class="flex items-start justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600 mb-2">Total</p>
								<p class="text-4xl font-bold text-gray-900 mb-2">{results.length}</p>
							</div>
							<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
								</svg>
							</div>
						</div>
					</div>
					<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
						<div class="flex items-start justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600 mb-2">New</p>
								<p class="text-4xl font-bold text-gray-900 mb-2">{results.filter(r => r.status === 'new').length}</p>
								<p class="text-sm text-blue-600">Awaiting action</p>
							</div>
							<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
								</svg>
							</div>
						</div>
					</div>
					<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
						<div class="flex items-start justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600 mb-2">Pending</p>
								<p class="text-4xl font-bold text-gray-900 mb-2">{results.filter(r => r.status === 'pending').length}</p>
								<p class="text-sm text-yellow-600">In progress</p>
							</div>
							<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
						</div>
					</div>
					<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
						<div class="flex items-start justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600 mb-2">Removed</p>
								<p class="text-4xl font-bold text-gray-900 mb-2">{results.filter(r => r.status === 'removed').length}</p>
								<p class="text-sm text-green-600">Taken down</p>
							</div>
							<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
						</div>
					</div>
				</div>

				<!-- Filter Tabs for List View -->
				<div class="flex gap-2 mb-6">
					<button
						onclick={() => selectedFilter = 'all'}
						class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all {selectedFilter === 'all' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm' : 'bg-white/50 text-gray-700 hover:bg-white/70'}"
					>
						All ({results.length})
					</button>
					<button
						onclick={() => selectedFilter = 'new'}
						class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all {selectedFilter === 'new' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/50 text-gray-700 hover:bg-white/70'}"
					>
						New ({results.filter(r => r.status === 'new').length})
					</button>
					<button
						onclick={() => selectedFilter = 'pending'}
						class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all {selectedFilter === 'pending' ? 'bg-yellow-600 text-white shadow-sm' : 'bg-white/50 text-gray-700 hover:bg-white/70'}"
					>
						Pending ({results.filter(r => r.status === 'pending').length})
					</button>
					<button
						onclick={() => selectedFilter = 'removed'}
						class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all {selectedFilter === 'removed' ? 'bg-green-600 text-white shadow-sm' : 'bg-white/50 text-gray-700 hover:bg-white/70'}"
					>
						Removed ({results.filter(r => r.status === 'removed').length})
					</button>
				</div>

				<!-- List View -->
				<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
					<h3 class="text-xl font-bold text-gray-900 mb-6">All Results</h3>
					<div class="space-y-4">
						{#each getFilteredResults() as result}
							<div class="result-card p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
							<div class="flex items-start justify-between gap-4">
								<div class="flex items-center gap-3 flex-1">
									<div class="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
										<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<h3 class="font-semibold text-gray-900 truncate">{result.site}</h3>
										<a href={result.url} target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 hover:text-blue-700 hover:underline truncate block">
											{result.url}
										</a>
										<div class="flex flex-wrap gap-1 mt-2">
											<span class="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">{result.imageType}</span>
											<span class="px-2 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-700">{result.websiteCategory}</span>
											<span class="px-2 py-0.5 rounded-md text-xs font-medium {result.status === 'new' ? 'bg-blue-100 text-blue-700' : result.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}">
												{result.status}
											</span>
											{#each result.tags as tagId}
												{@const tag = getTagById(tagId)}
												{#if tag}
													<span class="px-2 py-0.5 rounded-md text-xs font-medium text-white" style="background-color: {tag.color}">
														{tag.name}
													</span>
												{/if}
											{/each}
										</div>
									</div>
								</div>
								<div class="flex flex-col items-end gap-2">
									<p class="text-xs text-gray-500 whitespace-nowrap">{result.foundDate}</p>
									<div class="flex gap-1">
										<button
											onclick={() => selectedResultForTag = selectedResultForTag === result.id ? null : result.id}
											class="p-1.5 rounded-lg bg-white/80 hover:bg-white text-gray-700 transition-all border border-gray-200"
											title="Manage tags"
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
											</svg>
										</button>
										{#if result.status === 'new'}
											<Button size="sm" class="h-8 text-xs bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
												Takedown
											</Button>
										{/if}
									</div>
									{#if selectedResultForTag === result.id}
										<div class="mt-2 p-2 rounded-lg bg-white border border-gray-200 shadow-lg max-w-xs">
											<p class="text-xs font-semibold text-gray-700 mb-2">Apply tags:</p>
											<div class="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
												{#each allTags as tag}
													<button
														onclick={() => toggleTag(result.id, tag.id)}
														class="px-2 py-1 rounded-md text-xs font-medium transition-all {result.tags.includes(tag.id) ? 'ring-2 ring-offset-1 ring-gray-400' : ''}"
														style="background-color: {tag.color}; color: white;"
													>
														{tag.name}
													</button>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							</div>
							</div>
						{/each}
					</div>
				</div>
			{:else if activeView === 'images'}
				<!-- Image Cards View with Grouping -->
				<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
					<h3 class="text-xl font-bold text-gray-900 mb-6">Image Gallery</h3>
					<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{#each getGroupedImages() as group}
							<div class="image-card rounded-xl bg-gray-50/50 border border-gray-200/50 overflow-hidden">
							<div class="relative aspect-square bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
								<svg class="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
								{#if group.count > 1}
									<div class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-lg">
										{group.count} sites
									</div>
								{/if}
								<div class="absolute bottom-2 left-2 right-2">
									<span class="px-2 py-1 rounded-md text-xs font-medium {group.firstResult.status === 'new' ? 'bg-blue-600' : group.firstResult.status === 'pending' ? 'bg-yellow-600' : 'bg-green-600'} text-white inline-block">
										{group.firstResult.status}
									</span>
								</div>
							</div>
							<div class="p-4">
								<p class="font-semibold text-sm text-gray-900 mb-1">{group.firstResult.imageType}</p>
								<p class="text-xs text-gray-600 truncate">{group.firstResult.site}</p>
								{#if group.count > 1}
									<p class="text-xs text-gray-500 mt-1">+{group.count - 1} more</p>
								{/if}
								<div class="mt-2 flex gap-1">
									{#if group.firstResult.status === 'new'}
										<Button size="sm" class="w-full text-xs bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
											Request Takedown
										</Button>
									{/if}
								</div>
							</div>
							</div>
						{/each}
					</div>
				</div>
			{:else if activeView === 'tagged'}
				<!-- Tagged View -->
				<div class="space-y-8">
					<!-- Add Custom Tag Button -->
					<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
						{#if !isAddingTag}
							<Button onclick={() => isAddingTag = true} size="sm" class="gap-2">
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
								</svg>
								Create Custom Tag
							</Button>
						{:else}
							<div class="flex gap-2 items-end">
								<div class="flex-1">
									<Label for="tagName" class="text-sm">Tag Name</Label>
									<Input id="tagName" bind:value={newTagName} placeholder="Enter tag name" class="mt-1" />
								</div>
								<div>
									<Label for="tagColor" class="text-sm">Color</Label>
									<input id="tagColor" type="color" bind:value={newTagColor} class="mt-1 h-10 w-16 rounded-lg border-2 border-gray-200 cursor-pointer" />
								</div>
								<Button onclick={addCustomTag} size="sm">Add</Button>
								<Button onclick={() => isAddingTag = false} variant="outline" size="sm">Cancel</Button>
							</div>
						{/if}
					</div>

					<!-- Results grouped by tags -->
					{#each Array.from(getResultsByTag().entries()) as [tagId, taggedResults]}
						{@const tag = tagId === 'untagged' ? { id: 'untagged', name: 'Untagged', color: '#9ca3af', isCustom: false } : getTagById(tagId)}
						{#if tag}
							<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
								<div class="flex items-center gap-2 mb-4">
									<span class="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style="background-color: {tag.color}">
										{tag.name}
									</span>
									<span class="text-sm text-gray-600">({taggedResults.length})</span>
								</div>
								<div class="space-y-4">
									{#each taggedResults as result}
										<div class="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
											<div class="flex items-center gap-4 flex-1 min-w-0">
												<div class="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
													<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
													</svg>
												</div>
												<div class="flex-1 min-w-0">
													<p class="font-semibold text-gray-900 truncate">{result.site}</p>
													<p class="text-sm text-gray-500 truncate">{result.imageType}</p>
												</div>
											</div>
											<span class="px-3 py-1 rounded-full text-sm font-medium {result.status === 'new' ? 'bg-blue-100 text-blue-700' : result.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}">
												{result.status}
											</span>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
			</div>
		</div>
	</div>
</div>
