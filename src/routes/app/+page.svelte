<script lang="ts">
	// Demo data for Bart De Wever
	const stats = [
		{ label: 'Total Pages', value: '47', sublabel: 'in your collection', color: 'blue' },
		{ label: 'You Added', value: '38', sublabel: 'pages yourself', color: 'emerald' },
		{ label: 'We Found', value: '9', sublabel: 'for review', color: 'purple' },
		{ label: 'This Month', value: '+5', sublabel: 'new pages', color: 'blue' }
	];

	const recentPages = [
		{
			id: 1,
			title: 'Bart De Wever over de regeringsvorming',
			site: 'De Standaard',
			date: '2 days ago',
			source: 'you',
			tags: ['Press', 'Politics']
		},
		{
			id: 2,
			title: 'Premier De Wever bezoekt Kyiv',
			site: 'VRT NWS',
			date: '4 days ago',
			source: 'you',
			tags: ['Press', 'International']
		},
		{
			id: 3,
			title: 'N-VA campagnefoto gebruikt op sociale media',
			site: 'Het Nieuwsblad',
			date: '1 week ago',
			source: 'found',
			tags: ['Campaign']
		},
		{
			id: 4,
			title: 'Interview: De toekomst van België',
			site: 'Knack',
			date: '2 weeks ago',
			source: 'you',
			tags: ['Press', 'Interview']
		},
		{
			id: 5,
			title: 'Burgemeester Antwerpen op persconferentie',
			site: 'Gazet van Antwerpen',
			date: '3 weeks ago',
			source: 'found',
			tags: ['Press', 'Local']
		}
	];

	function getSourceClasses(source: string): { bg: string; text: string; label: string } {
		if (source === 'you') {
			return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'You added' };
		}
		return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'We found' };
	}

	function getStatColorClasses(color: string): { bg: string } {
		switch (color) {
			case 'blue':
				return { bg: 'from-blue-500 to-cyan-500' };
			case 'emerald':
				return { bg: 'from-emerald-500 to-teal-500' };
			case 'purple':
				return { bg: 'from-purple-500 to-indigo-500' };
			default:
				return { bg: 'from-slate-500 to-slate-600' };
		}
	}
</script>

<svelte:head>
	<title>Your Collection - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="flex items-start justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Your Collection</h1>
			<p class="mt-1 text-slate-600">Pages featuring Bart De Wever</p>
		</div>
		<a
			href="/app/add"
			class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			Add page
		</a>
	</div>

	<!-- Quick Stats -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
		{#each stats as stat}
			{@const colors = getStatColorClasses(stat.color)}
			<div class="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
				<div class="flex items-start justify-between mb-3">
					<div class="h-10 w-10 rounded-xl bg-gradient-to-br {colors.bg} flex items-center justify-center">
						{#if stat.label === 'Total Pages'}
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
							</svg>
						{:else if stat.label === 'You Added'}
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
						{:else if stat.label === 'We Found'}
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						{:else}
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
							</svg>
						{/if}
					</div>
				</div>
				<p class="text-2xl font-bold text-slate-900">{stat.value}</p>
				<p class="text-sm text-slate-500">{stat.sublabel}</p>
			</div>
		{/each}
	</div>

	<div class="grid lg:grid-cols-3 gap-6">
		<!-- Recent Pages -->
		<div class="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
			<div class="flex items-center justify-between p-6 border-b border-slate-100">
				<div>
					<h2 class="text-lg font-semibold text-slate-900">Recent Pages</h2>
					<p class="text-sm text-slate-500">Latest additions to your collection</p>
				</div>
				<a href="/app/results" class="text-sm font-medium text-blue-600 hover:text-blue-700">
					View All
				</a>
			</div>
			<div class="divide-y divide-slate-100">
				{#each recentPages as page}
					{@const sourceStyle = getSourceClasses(page.source)}
					<div class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
						<div class="flex items-center gap-4">
							<div class="h-14 w-20 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden flex-shrink-0">
								<svg class="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<div class="min-w-0">
								<p class="font-medium text-slate-900 truncate">{page.title}</p>
								<p class="text-sm text-slate-500">{page.site} · {page.date}</p>
							</div>
						</div>
						<div class="flex items-center gap-3 flex-shrink-0">
							<span class="px-2.5 py-1 rounded-full text-xs font-medium {sourceStyle.bg} {sourceStyle.text}">
								{sourceStyle.label}
							</span>
							<a href="/app/results" class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
								<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right Column -->
		<div class="space-y-6">
			<!-- Quick Actions -->
			<div class="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
				<h2 class="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
				<div class="space-y-3">
					<a href="/app/add" class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group border border-blue-100">
						<div class="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
						</div>
						<div>
							<p class="font-medium text-slate-900">Add a page</p>
							<p class="text-sm text-slate-500">Found yourself somewhere?</p>
						</div>
					</a>
					<a href="/app/reference" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
						<div class="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center group-hover:bg-slate-300 transition-colors">
							<svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
							</svg>
						</div>
						<div>
							<p class="font-medium text-slate-900">Reference photos</p>
							<p class="text-sm text-slate-500">Help us find more</p>
						</div>
					</a>
					<a href="/app/tags" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
						<div class="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center group-hover:bg-slate-300 transition-colors">
							<svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
						</div>
						<div>
							<p class="font-medium text-slate-900">Manage tags</p>
							<p class="text-sm text-slate-500">Organize your collection</p>
						</div>
					</a>
				</div>
			</div>

			<!-- Stats Summary -->
			<div class="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
				<h3 class="font-semibold mb-4">Your journey</h3>
				<div class="space-y-3">
					<div class="flex justify-between items-center">
						<span class="text-slate-400 text-sm">First page added</span>
						<span class="text-sm font-medium">March 2023</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-slate-400 text-sm">Sites covered</span>
						<span class="text-sm font-medium">23 sites</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-slate-400 text-sm">Screenshots saved</span>
						<span class="text-sm font-medium">42 pages</span>
					</div>
				</div>
			</div>

			<!-- Coming Soon Teaser -->
			<div class="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-6">
				<div class="flex items-center gap-2 mb-3">
					<svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
					</svg>
					<span class="text-sm font-semibold text-purple-700">Coming Soon</span>
				</div>
				<h3 class="font-semibold text-slate-900 mb-2">More features on the way</h3>
				<p class="text-sm text-slate-600 mb-4">
					Context Analysis, Browser Extension, Agency Reports & more
				</p>
				<a href="/app/coming-soon" class="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
					See what's next
					<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>
