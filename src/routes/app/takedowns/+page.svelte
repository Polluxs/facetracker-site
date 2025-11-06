<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	type TakedownStatus = 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected' | 'completed';

	interface Takedown {
		id: string;
		site: string;
		url: string;
		imageId: string;
		status: TakedownStatus;
		submittedDate: string;
		lastUpdated: string;
		notes: string;
	}

	let isDropdownOpen = $state(false);
	let dropdownButton: HTMLButtonElement | null = $state(null);

	const mockTakedowns: Takedown[] = [
		{ id: '1', site: 'example-blog.com', url: 'https://example-blog.com/post/123', imageId: 'img1', status: 'submitted', submittedDate: '2 hours ago', lastUpdated: '2 hours ago', notes: 'Unauthorized use of profile photo' },
		{ id: '2', site: 'photo-sharing.net', url: 'https://photo-sharing.net/gallery/456', imageId: 'img2', status: 'pending', submittedDate: '1 day ago', lastUpdated: '5 hours ago', notes: 'DMCA takedown request' },
		{ id: '3', site: 'news-site.org', url: 'https://news-site.org/article/789', imageId: 'img1', status: 'completed', submittedDate: '3 days ago', lastUpdated: '1 day ago', notes: 'Successfully removed' },
		{ id: '4', site: 'forum-discussion.com', url: 'https://forum-discussion.com/thread/321', imageId: 'img3', status: 'approved', submittedDate: '5 days ago', lastUpdated: '2 days ago', notes: 'Approved by moderator' },
		{ id: '5', site: 'social-network.app', url: 'https://social-network.app/posts/333', imageId: 'img4', status: 'rejected', submittedDate: '1 week ago', lastUpdated: '3 days ago', notes: 'Need additional documentation' },
		{ id: '6', site: 'business-directory.co', url: 'https://business-directory.co/profile/654', imageId: 'img1', status: 'draft', submittedDate: '2 weeks ago', lastUpdated: '2 weeks ago', notes: 'Draft request' }
	];

	let takedowns = $state(mockTakedowns);

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
	<title>Your Takedowns - Facetracker</title>
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

	.animate-fade-in {
		animation: fadeInScale 0.6s ease-out forwards;
		opacity: 0;
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
		box-shadow: 0 12px 24px -8px rgba(239, 68, 68, 0.3);
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

<div class="min-h-screen bg-gradient-to-b from-red-50 to-pink-50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
		<!-- Header with Settings Cog -->
		<div class="text-center mb-12 relative">
			<a
				href="/app"
				class="inline-block mb-4 group cursor-pointer"
				title="Switch to Insights view"
			>
				<h1 class="text-5xl font-bold text-gray-900 transition-all duration-200 group-hover:scale-105">
					Your <span class="gradient-text group-hover:opacity-80 transition-opacity">Takedowns</span>
				</h1>
			</a>
			<p class="text-lg text-gray-600">Track and manage your takedown requests</p>

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
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
							</svg>
							View Insights
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
				<button
					class="relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white"
				>
					<div class="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"></div>
					<span class="relative z-10">Overview</span>
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

		<!-- Stats Summary -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
			<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
				<div class="flex items-start justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 mb-2">Total Requests</p>
						<p class="text-4xl font-bold text-gray-900 mb-2">{takedowns.length}</p>
					</div>
					<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
				<div class="flex items-start justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 mb-2">Pending</p>
						<p class="text-4xl font-bold text-gray-900 mb-2">{takedowns.filter(t => t.status === 'pending' || t.status === 'submitted').length}</p>
						<p class="text-sm text-orange-600">Awaiting response</p>
					</div>
					<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
				<div class="flex items-start justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 mb-2">Approved</p>
						<p class="text-4xl font-bold text-gray-900 mb-2">{takedowns.filter(t => t.status === 'approved').length}</p>
						<p class="text-sm text-blue-600">Ready to process</p>
					</div>
					<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="stat-card rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
				<div class="flex items-start justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 mb-2">Completed</p>
						<p class="text-4xl font-bold text-gray-900 mb-2">{takedowns.filter(t => t.status === 'completed').length}</p>
						<p class="text-sm text-green-600">Successfully removed</p>
					</div>
					<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Takedown Requests List -->
		<div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/40 shadow-lg">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-gray-900">Takedown Requests</h3>
				<Button class="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 gap-2">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
					</svg>
					New Request
				</Button>
			</div>
			<div class="space-y-4">
				{#each takedowns as takedown}
					<div class="p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
						<div class="flex items-start justify-between gap-4">
							<div class="flex items-center gap-4 flex-1">
								<div class="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
									<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-semibold text-gray-900">{takedown.site}</p>
									<a href={takedown.url} target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 hover:text-blue-700 hover:underline truncate block">
										{takedown.url}
									</a>
									<p class="text-sm text-gray-600 mt-1">{takedown.notes}</p>
									<div class="flex gap-2 mt-2 text-xs text-gray-500">
										<span>Submitted: {takedown.submittedDate}</span>
										<span>•</span>
										<span>Updated: {takedown.lastUpdated}</span>
									</div>
								</div>
							</div>
							<div class="flex flex-col items-end gap-2">
								<span class="px-3 py-1 rounded-full text-sm font-medium {
									takedown.status === 'draft' ? 'bg-gray-100 text-gray-700' :
									takedown.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
									takedown.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
									takedown.status === 'approved' ? 'bg-purple-100 text-purple-700' :
									takedown.status === 'rejected' ? 'bg-red-100 text-red-700' :
									'bg-green-100 text-green-700'
								}">
									{takedown.status}
								</span>
								<Button variant="outline" size="sm">View Details</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
