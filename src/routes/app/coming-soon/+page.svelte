<script lang="ts">
	interface Feature {
		id: string;
		icon: string;
		title: string;
		description: string;
		details: string[];
		notified: boolean;
	}

	let features = $state<Feature[]>([
		{
			id: 'context',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
			title: 'Context Analysis',
			description: 'Understand what pages are about and how your images are being used.',
			details: [
				'Automatic page content analysis',
				'Sentiment detection (positive, neutral, negative)',
				'Usage context classification',
				'Risk signal identification'
			],
			notified: false
		},
		{
			id: 'extension',
			icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
			title: 'Browser Extension',
			description: 'Save pages to your archive while browsing. One-click archiving when you find yourself online.',
			details: [
				'Chrome extension for instant archiving',
				'Right-click to save any page',
				'Automatic Wayback Machine integration',
				'Quick notes and tagging'
			],
			notified: false
		},
		{
			id: 'agency',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
			title: 'Agency Reports',
			description: 'Professional reports with popularity metrics for talent agencies and PR teams.',
			details: [
				'Exportable PDF and CSV reports',
				'Image usage analytics',
				'Popularity and reach metrics',
				'Multi-client management'
			],
			notified: false
		},
		{
			id: 'reverse',
			icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
			title: 'Reverse Image Search',
			description: 'Comprehensive coverage across multiple search engines for thorough monitoring.',
			details: [
				'Multi-engine search (Google, Bing, Yandex)',
				'Deep web scanning',
				'Duplicate detection across sources',
				'Broader reach for complete coverage'
			],
			notified: false
		},
		{
			id: 'alerts',
			icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
			title: 'Risk Alerts',
			description: 'Get notified when your images appear on suspicious sites or in concerning contexts.',
			details: [
				'Real-time notifications',
				'Suspicious site detection',
				'Impersonation alerts',
				'Reputation monitoring'
			],
			notified: false
		}
	]);

	function toggleNotify(id: string) {
		features = features.map(f =>
			f.id === id ? { ...f, notified: !f.notified } : f
		);
	}
</script>

<svelte:head>
	<title>Coming Soon - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="text-center mb-12">
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-4">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
			</svg>
			Coming Soon
		</div>
		<h1 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">More features on the way</h1>
		<p class="text-lg text-slate-600 max-w-2xl mx-auto">
			We're building more ways to protect your digital presence. Get notified when these features launch.
		</p>
	</div>

	<!-- Features Grid -->
	<div class="grid gap-6 lg:grid-cols-2">
		{#each features as feature}
			<div class="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
				<div class="p-6">
					<div class="flex items-start gap-4">
						<div class="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
							<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon} />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
							<p class="text-slate-600">{feature.description}</p>
						</div>
					</div>

					<ul class="mt-4 space-y-2">
						{#each feature.details as detail}
							<li class="flex items-center gap-2 text-sm text-slate-600">
								<svg class="h-4 w-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								{detail}
							</li>
						{/each}
					</ul>

					<button
						onclick={() => toggleNotify(feature.id)}
						class="mt-6 w-full py-2.5 rounded-xl font-medium transition-all {feature.notified
							? 'bg-purple-100 text-purple-700'
							: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
					>
						{#if feature.notified}
							<span class="flex items-center justify-center gap-2">
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								You'll be notified
							</span>
						{:else}
							Notify me when available
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>

	<!-- Chrome Extension Highlight -->
	<div class="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
		<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="flex items-start gap-4">
				<div class="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
					<svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.824a9.176 9.176 0 110 18.352 9.176 9.176 0 010-18.352zm0 2.824a6.353 6.353 0 100 12.705 6.353 6.353 0 000-12.705z"/>
					</svg>
				</div>
				<div>
					<div class="flex items-center gap-2 mb-2">
						<h3 class="text-xl font-bold">Chrome Extension</h3>
						<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20">Most Requested</span>
					</div>
					<p class="text-blue-100">
						Archive any page with a single click while browsing. Never miss an opportunity to preserve evidence of your online presence.
					</p>
				</div>
			</div>
			<button class="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors flex-shrink-0">
				Join Waitlist
			</button>
		</div>
	</div>

	<!-- Feedback Section -->
	<div class="mt-12 text-center">
		<h3 class="text-lg font-semibold text-slate-900 mb-2">Have a feature request?</h3>
		<p class="text-slate-600 mb-4">We'd love to hear what features would help you most.</p>
		<a
			href="/contact"
			class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
		>
			Share your ideas
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</a>
	</div>
</div>
