<script lang="ts">
	type Source = 'you' | 'found';
	type ViewMode = 'grid' | 'list';

	interface Page {
		id: number;
		title: string;
		site: string;
		url: string;
		imageUrl?: string;
		date: string;
		source: Source;
		tags: string[];
		hasScreenshot: boolean;
	}

	let viewMode = $state<ViewMode>('grid');
	let sourceFilter = $state<Source | 'all'>('all');
	let selectedPage = $state<Page | null>(null);

	// Bart De Wever demo data with Belgian news sources
	let pages = $state<Page[]>([
		{
			id: 1,
			title: 'Bart De Wever over de regeringsvorming',
			site: 'De Standaard',
			url: 'https://www.standaard.be/cnt/dmf20250110_97845632',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '2 days ago',
			source: 'you',
			tags: ['Press', 'Politics'],
			hasScreenshot: true
		},
		{
			id: 2,
			title: 'Premier De Wever bezoekt Kyiv',
			site: 'VRT NWS',
			url: 'https://www.vrt.be/vrtnws/nl/2024/06/09/bart-de-wever-n-va/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '4 days ago',
			source: 'you',
			tags: ['Press', 'International'],
			hasScreenshot: true
		},
		{
			id: 3,
			title: 'N-VA campagnefoto gebruikt op sociale media',
			site: 'The Brussels Times',
			url: 'https://www.brusselstimes.com/belgium/1105315/belgium-bart-de-wever-is-officially-prime-minister',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '1 week ago',
			source: 'found',
			tags: ['Campaign'],
			hasScreenshot: true
		},
		{
			id: 4,
			title: 'Interview: De toekomst van België',
			site: 'RTBF',
			url: 'https://www.rtbf.be/article/gouvernement-de-wever-voici-la-composition-du-futur-executif-federal-11499211',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '2 weeks ago',
			source: 'you',
			tags: ['Press', 'Interview'],
			hasScreenshot: true
		},
		{
			id: 5,
			title: 'Burgemeester Antwerpen op persconferentie',
			site: 'Politico Europe',
			url: 'https://www.politico.eu/article/bart-de-wever-belgium-prime-minister/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '3 weeks ago',
			source: 'found',
			tags: ['Press', 'Local'],
			hasScreenshot: true
		},
		{
			id: 6,
			title: 'De Wever reageert op economische plannen',
			site: 'The Hindu',
			url: 'https://www.thehindu.com/news/international/belgian-pm-de-wever-says-trumps-tariffs-are-a-wake-up-call-for-europe/article69178496.ece',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '3 weeks ago',
			source: 'you',
			tags: ['Press', 'Economy'],
			hasScreenshot: true
		},
		{
			id: 7,
			title: 'Bart De Wever in talkshow Vandaag',
			site: 'European Commission',
			url: 'https://audiovisual.ec.europa.eu/en/photo/P-076210~2F00-01',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '1 month ago',
			source: 'you',
			tags: ['TV', 'Interview'],
			hasScreenshot: true
		},
		{
			id: 8,
			title: 'Foto op N-VA congres gebruikt door derden',
			site: 'Reddit',
			url: 'https://www.reddit.com/r/belgium/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '1 month ago',
			source: 'found',
			tags: ['Campaign', 'Review'],
			hasScreenshot: false
		},
		{
			id: 9,
			title: 'Profiel: Wie is Bart De Wever?',
			site: 'Wikipedia',
			url: 'https://nl.wikipedia.org/wiki/Bart_De_Wever',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '2 months ago',
			source: 'you',
			tags: ['Reference'],
			hasScreenshot: true
		},
		{
			id: 10,
			title: 'De Wever op cover van Humo',
			site: 'Wikimedia Commons',
			url: 'https://commons.wikimedia.org/wiki/File:BartDeWever.jpg',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '2 months ago',
			source: 'you',
			tags: ['Press', 'Magazine'],
			hasScreenshot: true
		},
		{
			id: 11,
			title: 'Oude campagnefoto opgedoken',
			site: 'Facebook',
			url: 'https://www.facebook.com/BartDeWever/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '3 months ago',
			source: 'found',
			tags: ['Social', 'Review'],
			hasScreenshot: false
		},
		{
			id: 12,
			title: 'Officiële portretfoto op gemeentelijke website',
			site: 'Stad Antwerpen',
			url: 'https://www.antwerpen.be/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '6 months ago',
			source: 'you',
			tags: ['Official'],
			hasScreenshot: true
		}
	]);

	const filteredPages = $derived(
		sourceFilter === 'all' ? pages : pages.filter(p => p.source === sourceFilter)
	);

	const sourceCounts = $derived({
		all: pages.length,
		you: pages.filter(p => p.source === 'you').length,
		found: pages.filter(p => p.source === 'found').length
	});

	function getSourceClasses(source: Source): { bg: string; text: string; label: string } {
		if (source === 'you') {
			return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'You added' };
		}
		return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'We found' };
	}

	function openDetail(page: Page) {
		selectedPage = page;
	}

	function closeDetail() {
		selectedPage = null;
	}

	function removePage(id: number) {
		pages = pages.filter(p => p.id !== id);
		if (selectedPage?.id === id) {
			selectedPage = null;
		}
	}
</script>

<svelte:head>
	<title>Your Pages - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="flex items-start justify-between mb-6">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Your Pages</h1>
			<p class="mt-1 text-slate-600">Pages featuring Bart De Wever across the web</p>
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

	<!-- Filters and View Toggle -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
		<!-- Source Filter -->
		<div class="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
			<button
				onclick={() => sourceFilter = 'all'}
				class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
					{sourceFilter === 'all'
						? 'bg-slate-900 text-white'
						: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}"
			>
				All pages ({sourceCounts.all})
			</button>
			<button
				onclick={() => sourceFilter = 'you'}
				class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
					{sourceFilter === 'you'
						? 'bg-emerald-600 text-white'
						: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}"
			>
				You added ({sourceCounts.you})
			</button>
			<button
				onclick={() => sourceFilter = 'found'}
				class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
					{sourceFilter === 'found'
						? 'bg-blue-600 text-white'
						: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}"
			>
				We found ({sourceCounts.found})
			</button>
		</div>

		<!-- View Toggle -->
		<div class="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
			<button
				onclick={() => viewMode = 'grid'}
				class="p-2 rounded-lg transition-colors {viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}"
				aria-label="Grid view"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
				</svg>
			</button>
			<button
				onclick={() => viewMode = 'list'}
				class="p-2 rounded-lg transition-colors {viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}"
				aria-label="List view"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</div>

	<!-- Grid View -->
	{#if viewMode === 'grid'}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each filteredPages as page}
				{@const sourceStyle = getSourceClasses(page.source)}
				<button
					onclick={() => openDetail(page)}
					class="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg transition-all text-left"
				>
					<div class="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative">
						{#if page.imageUrl}
							<img
								src={page.imageUrl}
								alt={page.title}
								class="absolute inset-0 w-full h-full object-cover"
							/>
						{:else}
							<div class="absolute inset-0 flex items-center justify-center">
								<svg class="h-10 w-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
						{/if}
						<div class="absolute top-2 right-2">
							<span class="px-2.5 py-1 rounded-full text-xs font-medium {sourceStyle.bg} {sourceStyle.text}">
								{sourceStyle.label}
							</span>
						</div>
						{#if !page.hasScreenshot}
							<div class="absolute bottom-2 left-2">
								<span class="px-2 py-1 rounded-lg text-xs font-medium bg-amber-100 text-amber-700">
									Pending screenshot
								</span>
							</div>
						{/if}
					</div>
					<div class="p-4">
						<p class="font-medium text-slate-900 truncate">{page.title}</p>
						<p class="text-sm text-slate-500">{page.site} · {page.date}</p>
						{#if page.tags.length > 0}
							<div class="flex flex-wrap gap-1 mt-2">
								{#each page.tags.slice(0, 3) as tag}
									<span class="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">{tag}</span>
								{/each}
								{#if page.tags.length > 3}
									<span class="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-500">+{page.tags.length - 3}</span>
								{/if}
							</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	{:else}
		<!-- List View -->
		<div class="rounded-2xl bg-white border border-slate-200 overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-slate-50 border-b border-slate-200">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Page</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Site</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Added</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags</th>
							<th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100">
						{#each filteredPages as page}
							{@const sourceStyle = getSourceClasses(page.source)}
							<tr class="hover:bg-slate-50 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div class="h-12 w-16 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
											{#if page.imageUrl}
												<img
													src={page.imageUrl}
													alt={page.title}
													class="w-full h-full object-cover"
												/>
											{:else}
												<svg class="h-5 w-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
												</svg>
											{/if}
										</div>
										<p class="font-medium text-slate-900 truncate max-w-xs">{page.title}</p>
									</div>
								</td>
								<td class="px-6 py-4">
									<p class="text-slate-600">{page.site}</p>
								</td>
								<td class="px-6 py-4 text-sm text-slate-500">{page.date}</td>
								<td class="px-6 py-4">
									<span class="px-2.5 py-1 rounded-full text-xs font-medium {sourceStyle.bg} {sourceStyle.text}">
										{sourceStyle.label}
									</span>
								</td>
								<td class="px-6 py-4">
									{#if page.tags.length > 0}
										<div class="flex flex-wrap gap-1">
											{#each page.tags.slice(0, 2) as tag}
												<span class="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">{tag}</span>
											{/each}
											{#if page.tags.length > 2}
												<span class="text-xs text-slate-400">+{page.tags.length - 2}</span>
											{/if}
										</div>
									{:else}
										<span class="text-sm text-slate-400">-</span>
									{/if}
								</td>
								<td class="px-6 py-4 text-right">
									<button
										onclick={() => openDetail(page)}
										class="text-blue-600 hover:text-blue-700 text-sm font-medium"
									>
										View
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- Empty State -->
	{#if filteredPages.length === 0}
		<div class="text-center py-12">
			<svg class="h-12 w-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
			</svg>
			<h3 class="text-lg font-medium text-slate-900 mb-1">No pages found</h3>
			<p class="text-slate-500 mb-4">
				{#if sourceFilter === 'you'}
					You haven't added any pages yet.
				{:else if sourceFilter === 'found'}
					We haven't found any pages for you yet.
				{:else}
					Your collection is empty.
				{/if}
			</p>
			<a
				href="/app/add"
				class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Add your first page
			</a>
		</div>
	{/if}
</div>

<!-- Detail Panel (Slide-out) -->
{#if selectedPage}
	{@const sourceStyle = getSourceClasses(selectedPage.source)}
	<div class="fixed inset-0 z-50">
		<!-- Backdrop -->
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={closeDetail}
			aria-label="Close panel"
		></button>

		<!-- Panel -->
		<div class="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
			<!-- Header -->
			<div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<h2 class="text-lg font-semibold text-slate-900">Page Details</h2>
					<span class="px-2.5 py-1 rounded-full text-xs font-medium {sourceStyle.bg} {sourceStyle.text}">
						{sourceStyle.label}
					</span>
				</div>
				<button onclick={closeDetail} class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
					<svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="p-6 space-y-6">
				<!-- Screenshot Preview -->
				<div class="aspect-video rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
					{#if selectedPage.imageUrl}
						<img
							src={selectedPage.imageUrl}
							alt={selectedPage.title}
							class="absolute inset-0 w-full h-full object-cover"
						/>
					{:else if selectedPage.hasScreenshot}
						<svg class="h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					{:else}
						<div class="text-center">
							<svg class="h-12 w-12 text-amber-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p class="text-sm text-slate-500">Screenshot pending</p>
						</div>
					{/if}
				</div>

				<!-- Page Title -->
				<div>
					<h3 class="text-xl font-semibold text-slate-900">{selectedPage.title}</h3>
					<p class="text-slate-500 mt-1">{selectedPage.site} · {selectedPage.date}</p>
				</div>

				<!-- Source Information -->
				<div class="rounded-xl bg-slate-50 p-4 space-y-3">
					<div>
						<p class="text-sm text-slate-500">URL</p>
						<p class="font-medium text-slate-900 text-sm break-all">{selectedPage.url}</p>
					</div>
				</div>

				<!-- Tags -->
				<div class="space-y-3">
					<h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tags</h3>
					<div class="flex flex-wrap gap-2">
						{#each selectedPage.tags as tag}
							<span class="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700">{tag}</span>
						{/each}
						<button class="px-3 py-1 rounded-full text-sm border border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-600 transition-colors">
							+ Add Tag
						</button>
					</div>
				</div>

				<!-- Actions -->
				<div class="space-y-3">
					<h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Actions</h3>
					<div class="grid grid-cols-2 gap-3">
						<a
							href={selectedPage.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
							Visit Page
						</a>
						<a
							href="/app/archive"
							class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							View Screenshot
						</a>
					</div>
					<a
						href="/app/takedowns"
						class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						Request Takedown
					</a>
				</div>

				<!-- Notes -->
				<div class="space-y-3">
					<h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Private Notes</h3>
					<textarea
						placeholder="Add private notes about this page..."
						class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
						rows="3"
					></textarea>
				</div>

				<!-- Danger Zone -->
				<div class="pt-4 border-t border-slate-200">
					<button
						onclick={() => selectedPage && removePage(selectedPage.id)}
						class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						Remove from collection
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
