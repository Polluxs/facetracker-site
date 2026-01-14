<script lang="ts">
	type TimelineEventType = 'page' | 'image' | 'milestone' | 'note';

	interface Tag {
		id: string;
		name: string;
		color: string;
	}

	interface TimelineEvent {
		id: number;
		type: TimelineEventType;
		title: string;
		description?: string;
		site?: string;
		url?: string;
		imageUrl?: string;
		date: string;
		dateSort: number;
		tags?: string[];
		archived?: {
			date: string;
			screenshotUrl?: string;
			waybackUrl?: string;
		};
	}

	// Available tags
	const availableTags: Tag[] = [
		{ id: 'press', name: 'Press', color: 'bg-blue-100 text-blue-700' },
		{ id: 'professional', name: 'Professional', color: 'bg-emerald-100 text-emerald-700' },
		{ id: 'personal', name: 'Personal', color: 'bg-pink-100 text-pink-700' },
		{ id: 'social', name: 'Social Media', color: 'bg-purple-100 text-purple-700' },
		{ id: 'politics', name: 'Politics', color: 'bg-amber-100 text-amber-700' },
		{ id: 'interview', name: 'Interview', color: 'bg-cyan-100 text-cyan-700' }
	];

	function getTagById(id: string): Tag | undefined {
		return availableTags.find(t => t.id === id);
	}

	// Demo timeline data for Bart De Wever
	let timelineEvents = $state<TimelineEvent[]>([
		{
			id: 1,
			type: 'page',
			title: 'Het team achter premier De Wever',
			description: 'Wie zat in de Belgische war room van de premier?',
			site: 'VRT NWS',
			url: 'https://www.vrt.be/vrtnws/nl/2025/12/19/het-team-van-de-wever-euroclear/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '2025-12-19',
			dateSort: 20251219,
			tags: ['press', 'politics'],
			archived: {
				date: '2025-12-20',
				waybackUrl: 'https://web.archive.org/web/20251220/vrt.be/vrtnws/nl/2025/12/19/het-team-van-de-wever-euroclear/'
			}
		},
		{
			id: 2,
			type: 'image',
			title: 'Official portrait European Commission visit',
			description: 'Photo used in international press',
			site: 'Wikimedia Commons',
			url: 'https://commons.wikimedia.org/wiki/File:Visit_of_Bart_De_Wever.jpg',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '2025-12-15',
			dateSort: 20251215,
			tags: ['professional', 'politics']
		},
		{
			id: 3,
			type: 'milestone',
			title: 'Became Prime Minister',
			description: 'Sworn in as first Flemish nationalist PM of Belgium',
			date: '2025-02-03',
			dateSort: 20250203,
			tags: ['politics']
		},
		{
			id: 4,
			type: 'page',
			title: 'Portret: 20 jaar politiek domineren',
			site: 'VRT NWS',
			url: 'https://www.vrt.be/vrtnws/nl/2025/01/10/portret-bart-de-wever/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '2025-01-10',
			dateSort: 20250110,
			tags: ['press', 'interview'],
			archived: {
				date: '2025-01-11',
				waybackUrl: 'https://web.archive.org/web/20250111/vrt.be/vrtnws/nl/2025/01/10/portret-bart-de-wever/'
			}
		},
		{
			id: 5,
			type: 'page',
			title: 'De Wever reageert op Politico kritiek',
			site: 'RTBF',
			url: 'https://www.rtbf.be/article/bart-de-wever-s-attaque-au-media-politico-je-dois-retourner-a-ma-datcha-a-saint-petersbourg-ou-mon-voisin-est-depardieu-et-ou-assad-habite-en-face-11651378',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			date: '2025-12-19',
			dateSort: 20251219,
			tags: ['press', 'politics']
		},
		{
			id: 6,
			type: 'note',
			title: 'Start of coalition negotiations',
			description: 'First round of talks with potential partners',
			date: '2024-07-01',
			dateSort: 20240701,
			tags: ['politics']
		},
		{
			id: 7,
			type: 'milestone',
			title: 'Election Victory',
			description: 'N-VA becomes largest party in federal elections',
			date: '2024-06-09',
			dateSort: 20240609,
			tags: ['politics']
		},
		{
			id: 8,
			type: 'page',
			title: 'Who is Bart De Wever?',
			site: 'Brussels Times',
			url: 'https://www.brusselstimes.com/1310698/belgiums-next-prime-minister-who-is-bart-de-wever',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			date: '2024-06-15',
			dateSort: 20240615,
			tags: ['press'],
			archived: {
				date: '2024-06-16',
				waybackUrl: 'https://web.archive.org/web/20240616/brusselstimes.com/1310698/belgiums-next-prime-minister-who-is-bart-de-wever'
			}
		}
	]);

	// Sort by date descending
	const sortedEvents = $derived(
		[...timelineEvents].sort((a, b) => b.dateSort - a.dateSort)
	);

	let showAddModal = $state(false);
	let newEntry = $state({
		type: 'page' as TimelineEventType,
		title: '',
		description: '',
		site: '',
		url: '',
		imageUrl: '',
		date: new Date().toISOString().split('T')[0], // Today's date as suggestion
		tags: [] as string[]
	});

	function toggleTag(tagId: string) {
		if (newEntry.tags.includes(tagId)) {
			newEntry.tags = newEntry.tags.filter(t => t !== tagId);
		} else {
			newEntry.tags = [...newEntry.tags, tagId];
		}
	}

	function getEventStyle(type: TimelineEventType) {
		switch (type) {
			case 'page':
				return {
					bg: 'bg-blue-50',
					border: 'border-blue-100',
					icon: 'bg-blue-100',
					iconColor: 'text-blue-600',
					dot: 'bg-blue-500'
				};
			case 'image':
				return {
					bg: 'bg-purple-50',
					border: 'border-purple-100',
					icon: 'bg-purple-100',
					iconColor: 'text-purple-600',
					dot: 'bg-purple-500'
				};
			case 'milestone':
				return {
					bg: 'bg-amber-50',
					border: 'border-amber-100',
					icon: 'bg-amber-100',
					iconColor: 'text-amber-600',
					dot: 'bg-amber-500'
				};
			case 'note':
				return {
					bg: 'bg-slate-50',
					border: 'border-slate-200',
					icon: 'bg-slate-100',
					iconColor: 'text-slate-600',
					dot: 'bg-slate-400'
				};
		}
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
	}

	function getMonthYear(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	}

	// Group events by month
	function groupByMonth(events: TimelineEvent[]) {
		const groups: { [key: string]: TimelineEvent[] } = {};
		events.forEach(event => {
			const monthYear = getMonthYear(event.date);
			if (!groups[monthYear]) {
				groups[monthYear] = [];
			}
			groups[monthYear].push(event);
		});
		return groups;
	}

	const groupedEvents = $derived(groupByMonth(sortedEvents));
	const monthOrder = $derived(Object.keys(groupedEvents));

	function addEntry() {
		if (!newEntry.title.trim()) return;

		const dateSort = parseInt(newEntry.date.replace(/-/g, ''));
		const entry: TimelineEvent = {
			id: Date.now(),
			type: newEntry.type,
			title: newEntry.title.trim(),
			description: newEntry.description.trim() || undefined,
			site: newEntry.site.trim() || undefined,
			url: newEntry.url.trim() || undefined,
			imageUrl: newEntry.imageUrl.trim() || undefined,
			date: newEntry.date,
			dateSort,
			tags: newEntry.tags.length > 0 ? [...newEntry.tags] : undefined
		};

		timelineEvents = [...timelineEvents, entry];
		showAddModal = false;
		resetForm();
	}

	function resetForm() {
		newEntry = {
			type: 'page',
			title: '',
			description: '',
			site: '',
			url: '',
			imageUrl: '',
			date: new Date().toISOString().split('T')[0],
			tags: []
		};
	}

	function deleteEntry(id: number) {
		timelineEvents = timelineEvents.filter(e => e.id !== id);
	}
</script>

<svelte:head>
	<title>Timeline - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8 max-w-4xl mx-auto">
	<!-- Header -->
	<div class="flex items-start justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Your Timeline</h1>
			<p class="mt-1 text-slate-600">Your story, from the beginning to now</p>
		</div>
		<button
			onclick={() => showAddModal = true}
			class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			Add to Timeline
		</button>
	</div>

	<!-- Legend -->
	<div class="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-xl border border-slate-200">
		<div class="flex items-center gap-2">
			<div class="h-3 w-3 rounded-full bg-blue-500"></div>
			<span class="text-sm text-slate-600">Website</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="h-3 w-3 rounded-full bg-purple-500"></div>
			<span class="text-sm text-slate-600">Unique Image</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="h-3 w-3 rounded-full bg-amber-500"></div>
			<span class="text-sm text-slate-600">Milestone</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="h-3 w-3 rounded-full bg-slate-400"></div>
			<span class="text-sm text-slate-600">Note</span>
		</div>
	</div>

	<!-- Timeline -->
	<div class="relative">
		<!-- Vertical line -->
		<div class="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>

		{#each monthOrder as month, monthIndex}
			<!-- Month header -->
			<div class="relative mb-4 {monthIndex > 0 ? 'mt-10' : ''}">
				<div class="absolute left-3 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center z-10">
					<svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
				<div class="ml-16">
					<h2 class="text-lg font-semibold text-slate-900">{month}</h2>
				</div>
			</div>

			<!-- Events in this month -->
			{#each groupedEvents[month] as event}
				{@const style = getEventStyle(event.type)}
				<div class="relative mb-4 ml-12 group">
					<!-- Dot on timeline -->
					<div class="absolute -left-9 top-4 w-3 h-3 rounded-full {style.dot} border-2 border-white shadow-sm"></div>

					<div class="rounded-xl {style.bg} border {style.border} p-4 hover:shadow-md transition-shadow overflow-hidden">
						{#if event.imageUrl}
							<div class="relative -mx-4 -mt-4 mb-3">
								<img
									src={event.imageUrl}
									alt={event.title}
									class="w-full h-32 object-cover"
								/>
								<div class="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
									{event.type === 'page' ? 'Website' : 'Image'}
								</div>
							</div>
						{/if}
						<div class="flex items-start gap-4">
							<!-- Icon -->
							{#if !event.imageUrl}
							<div class="w-12 h-12 rounded-xl {style.icon} flex items-center justify-center flex-shrink-0">
								{#if event.type === 'page'}
									<svg class="h-5 w-5 {style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
								{:else if event.type === 'image'}
									<svg class="h-5 w-5 {style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								{:else if event.type === 'milestone'}
									<svg class="h-5 w-5 {style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
									</svg>
								{:else}
									<svg class="h-5 w-5 {style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
								{/if}
							</div>
							{/if}

							<div class="flex-1 min-w-0">
								<div class="flex items-start justify-between gap-2">
									<div>
										<p class="font-semibold text-slate-900">{event.title}</p>
										{#if event.description}
											<p class="text-sm text-slate-600 mt-0.5">{event.description}</p>
										{/if}
										{#if event.site}
											<p class="text-sm text-slate-500 mt-1">{event.site}</p>
										{/if}
										{#if event.archived}
											<div class="flex items-center gap-1.5 mt-1.5">
												{#if event.archived.waybackUrl}
													<a
														href={event.archived.waybackUrl}
														target="_blank"
														rel="noopener noreferrer"
														class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors"
													>
														<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
														</svg>
														Archived {event.archived.date}
													</a>
												{:else}
													<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
														<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
														</svg>
														Archived {event.archived.date}
													</span>
												{/if}
											</div>
										{:else if event.type === 'page'}
											<button class="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-xs font-medium hover:bg-slate-200 transition-colors">
												<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
												</svg>
												Archive now
											</button>
										{/if}
										{#if event.tags && event.tags.length > 0}
											<div class="flex flex-wrap gap-1.5 mt-2">
												{#each event.tags as tagId}
													{@const tag = getTagById(tagId)}
													{#if tag}
														<span class="px-2 py-0.5 text-xs font-medium rounded-full {tag.color}">
															{tag.name}
														</span>
													{/if}
												{/each}
											</div>
										{/if}
									</div>
									<div class="flex items-center gap-2">
										<p class="text-xs text-slate-400 whitespace-nowrap">{formatDate(event.date)}</p>
										{#if event.url}
											<a
												href={event.url}
												target="_blank"
												rel="noopener noreferrer"
												class="p-1.5 rounded-lg hover:bg-white/50 transition-colors"
											>
												<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
												</svg>
											</a>
										{/if}
										<button
											onclick={() => deleteEntry(event.id)}
											class="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
											aria-label="Delete"
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{/each}

		<!-- End of timeline marker -->
		<div class="relative mt-10">
			<div class="absolute left-3 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center z-10">
				<svg class="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
				</svg>
			</div>
			<div class="ml-16">
				<p class="text-sm text-slate-400">Your story begins here</p>
			</div>
		</div>
	</div>
</div>

<!-- Add Entry Modal -->
{#if showAddModal}
	<div class="fixed inset-0 z-50">
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={() => { showAddModal = false; resetForm(); }}
			aria-label="Close"
		></button>

		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
			<div class="px-6 py-4 border-b border-slate-200">
				<h2 class="text-lg font-semibold text-slate-900">Add to Timeline</h2>
			</div>

			<div class="p-6 space-y-4">
				<!-- Type -->
				<div>
					<label class="block text-sm font-medium text-slate-700 mb-2">What are you adding?</label>
					<div class="grid grid-cols-2 gap-2">
						<button
							onclick={() => newEntry.type = 'page'}
							class="flex items-center gap-2 p-3 rounded-xl border-2 transition-colors text-left
								{newEntry.type === 'page' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}"
						>
							<div class="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
								<svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
							</div>
							<span class="text-sm font-medium {newEntry.type === 'page' ? 'text-blue-700' : 'text-slate-700'}">Website</span>
						</button>
						<button
							onclick={() => newEntry.type = 'image'}
							class="flex items-center gap-2 p-3 rounded-xl border-2 transition-colors text-left
								{newEntry.type === 'image' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-slate-300'}"
						>
							<div class="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
								<svg class="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<span class="text-sm font-medium {newEntry.type === 'image' ? 'text-purple-700' : 'text-slate-700'}">Unique Image</span>
						</button>
						<button
							onclick={() => newEntry.type = 'milestone'}
							class="flex items-center gap-2 p-3 rounded-xl border-2 transition-colors text-left
								{newEntry.type === 'milestone' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300'}"
						>
							<div class="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
								<svg class="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
								</svg>
							</div>
							<span class="text-sm font-medium {newEntry.type === 'milestone' ? 'text-amber-700' : 'text-slate-700'}">Milestone</span>
						</button>
						<button
							onclick={() => newEntry.type = 'note'}
							class="flex items-center gap-2 p-3 rounded-xl border-2 transition-colors text-left
								{newEntry.type === 'note' ? 'border-slate-500 bg-slate-100' : 'border-slate-200 hover:border-slate-300'}"
						>
							<div class="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center">
								<svg class="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
							</div>
							<span class="text-sm font-medium {newEntry.type === 'note' ? 'text-slate-700' : 'text-slate-700'}">Note</span>
						</button>
					</div>
				</div>

				<!-- Date -->
				<div>
					<label for="date" class="block text-sm font-medium text-slate-700 mb-1">When did this happen?</label>
					<input
						type="date"
						id="date"
						bind:value={newEntry.date}
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
					/>
					<p class="text-xs text-slate-500 mt-1">Suggested: Today</p>
				</div>

				<!-- Title -->
				<div>
					<label for="title" class="block text-sm font-medium text-slate-700 mb-1">Title</label>
					<input
						type="text"
						id="title"
						bind:value={newEntry.title}
						placeholder="e.g., Featured in De Standaard"
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
					/>
				</div>

				<!-- Description -->
				<div>
					<label for="description" class="block text-sm font-medium text-slate-700 mb-1">
						Description <span class="text-slate-400">(optional)</span>
					</label>
					<textarea
						id="description"
						bind:value={newEntry.description}
						placeholder="Add more details..."
						rows="2"
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
					></textarea>
				</div>

				<!-- URL (for pages/images) -->
				{#if newEntry.type === 'page' || newEntry.type === 'image'}
					<div>
						<label for="url" class="block text-sm font-medium text-slate-700 mb-1">
							URL <span class="text-slate-400">(optional)</span>
						</label>
						<input
							type="url"
							id="url"
							bind:value={newEntry.url}
							placeholder="https://..."
							class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
						/>
					</div>

					<div>
						<label for="site" class="block text-sm font-medium text-slate-700 mb-1">
							Site name <span class="text-slate-400">(optional)</span>
						</label>
						<input
							type="text"
							id="site"
							bind:value={newEntry.site}
							placeholder="e.g., De Standaard"
							class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
						/>
					</div>

					<div>
						<label for="imageUrl" class="block text-sm font-medium text-slate-700 mb-1">
							Image URL <span class="text-slate-400">(optional)</span>
						</label>
						<input
							type="url"
							id="imageUrl"
							bind:value={newEntry.imageUrl}
							placeholder="https://example.com/image.jpg"
							class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
						/>
						{#if newEntry.imageUrl}
							<div class="mt-2 rounded-lg overflow-hidden border border-slate-200">
								<img
									src={newEntry.imageUrl}
									alt="Preview"
									class="w-full h-32 object-cover"
									onerror={(e) => e.currentTarget.style.display = 'none'}
								/>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Tags -->
				<div>
					<label class="block text-sm font-medium text-slate-700 mb-2">
						Tags <span class="text-slate-400">(optional)</span>
					</label>
					<div class="flex flex-wrap gap-2">
						{#each availableTags as tag}
							<button
								type="button"
								onclick={() => toggleTag(tag.id)}
								class="px-3 py-1.5 text-sm font-medium rounded-full transition-all
									{newEntry.tags.includes(tag.id)
										? tag.color + ' ring-2 ring-offset-1 ring-current'
										: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
							>
								{tag.name}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
				<button
					onclick={() => { showAddModal = false; resetForm(); }}
					class="px-4 py-2 rounded-xl text-slate-700 font-medium hover:bg-slate-200 transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={addEntry}
					disabled={!newEntry.title.trim()}
					class="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Add to Timeline
				</button>
			</div>
		</div>
	</div>
{/if}
