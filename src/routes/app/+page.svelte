<script lang="ts">
	import { goto } from '$app/navigation';

	/*
	 * Data provider notes for future implementation:
	 * - Social engagement stats: sharedcount.com API
	 * - Site traffic estimates: developers.similarweb.com API
	 */
	interface Image {
		id: number;
		title: string;
		site: string;
		url: string;
		imageUrl: string;
		screenshotUrl?: string;
		foundDate: string;
		status: 'pending' | 'verified';
		hasScreenshot: boolean;
		isOffline?: boolean;
		summary?: string;
		fullSummary?: string;
		portrayal?: {
			type: 'praised' | 'criticized' | 'quoted' | 'mentioned';
			text: string;
		};
		reach?: {
			siteMonthlyVisits?: string; // e.g., "2.5M"
			social?: {
				facebook?: {
					shares: number;
					comments: number;
					reactions: number;
				};
				pinterest?: number;
			};
		};
	}

	// Selected image for detail panel
	let selectedImage = $state<Image | null>(null);

	function selectImage(image: Image | null) {
		selectedImage = image;
	}

	function closeDetail() {
		selectedImage = null;
	}

	// Demo data
	let pendingImages = $state<Image[]>([
		{
			id: 101,
			title: 'Belgian PM at EU Summit',
			site: 'VRT News',
			url: 'https://www.vrt.be/vrtnws/nl/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '2 hours ago',
			status: 'pending',
			hasScreenshot: true,
			summary: 'News article about EU summit meeting with European leaders. You are featured as the key speaker in negotiations.'
		},
		{
			id: 102,
			title: 'De Wever reageert op economisch plan',
			site: 'De Standaard',
			url: 'https://www.standaard.be/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: 'Yesterday',
			status: 'pending',
			hasScreenshot: true,
			summary: 'Opinion piece discussing government economic policy reforms. You are quoted criticizing the opposition\'s budget proposal.'
		}
	]);

	let verifiedImages = $state<Image[]>([
		{
			id: 1,
			title: 'Bart De Wever over de regeringsvorming',
			site: 'De Standaard',
			url: 'https://www.standaard.be/cnt/dmf20250110_97845632',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			screenshotUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '2 days ago',
			status: 'verified',
			hasScreenshot: true,
			summary: 'Interview about coalition negotiations. You are the main subject discussing formation progress.',
			fullSummary: 'In-depth interview with De Standaard about the ongoing government formation process. The article covers your views on coalition partnerships, policy priorities, and timeline expectations. You are quoted extensively on economic reforms and institutional changes. The piece includes reactions from other party leaders.',
			portrayal: {
				type: 'praised',
				text: 'Praised for your steady leadership during complex coalition talks'
			},
			reach: {
				siteMonthlyVisits: '8.2M',
				social: {
					facebook: { shares: 234, comments: 89, reactions: 512 },
					pinterest: 12
				}
			}		},
		{
			id: 2,
			title: 'Premier De Wever bezoekt Kyiv',
			site: 'VRT NWS',
			url: 'https://www.vrt.be/vrtnws/nl/2024/06/09/bart-de-wever-n-va/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			screenshotUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '4 days ago',
			status: 'verified',
			hasScreenshot: true,
			summary: 'Coverage of diplomatic visit to Ukraine. You are shown meeting with Ukrainian officials.',
			fullSummary: 'VRT News report on your official visit to Kyiv as part of EU diplomatic efforts. The article covers meetings with President Zelensky and discussions about continued Belgian support for Ukraine. Includes footage from press conference and bilateral meetings. Your statements on military aid and reconstruction efforts are highlighted.',
			portrayal: {
				type: 'quoted',
				text: 'Quoted on Belgium\'s continued support for Ukraine'
			},
			reach: {
				siteMonthlyVisits: '12.4M',
				social: {
					facebook: { shares: 1420, comments: 356, reactions: 2891 }
				}
			}		},
		{
			id: 3,
			title: 'N-VA campagnefoto gebruikt op sociale media',
			site: 'The Brussels Times',
			url: 'https://www.brusselstimes.com/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			screenshotUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '1 week ago',
			status: 'verified',
			hasScreenshot: true,
			summary: 'Analysis of party social media strategy. Your official portrait is used as an example.',
			fullSummary: 'The Brussels Times analysis of how Belgian political parties use social media for campaigning. Your official campaign photos are featured as examples of effective political branding. The article discusses image strategy, messaging consistency, and digital outreach methods used by N-VA.',
			portrayal: {
				type: 'mentioned',
				text: 'Mentioned as an example of effective political branding'
			}		},
		{
			id: 4,
			title: 'Interview: De toekomst van België',
			site: 'RTBF',
			url: 'https://www.rtbf.be/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '2 weeks ago',
			status: 'verified',
			hasScreenshot: false,
			fullSummary: 'RTBF opinion piece discussing the future of Belgium and federal reform proposals. The article takes a critical stance on confederalism plans and questions the economic viability of proposed institutional changes.',
			portrayal: {
				type: 'criticized',
				text: 'Criticized for your confederalism proposals'
			},
			reach: {
				siteMonthlyVisits: '5.1M',
				social: {
					facebook: { shares: 89, comments: 234, reactions: 167 }
				}
			}		},
		{
			id: 5,
			title: 'Burgemeester Antwerpen op persconferentie',
			site: 'Politico Europe',
			url: 'https://www.politico.eu/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '3 weeks ago',
			status: 'verified',
			hasScreenshot: false,
			isOffline: true
		},
		{
			id: 6,
			title: 'De Wever reageert op economische plannen',
			site: 'The Hindu',
			url: 'https://www.thehindu.com/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '3 weeks ago',
			status: 'verified',
			hasScreenshot: false
		},
		{
			id: 7,
			title: 'Bart De Wever in talkshow Vandaag',
			site: 'European Commission',
			url: 'https://audiovisual.ec.europa.eu/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '1 month ago',
			status: 'verified',
			hasScreenshot: false
		},
		{
			id: 8,
			title: 'Officiële portretfoto op gemeentelijke website',
			site: 'Stad Antwerpen',
			url: 'https://www.antwerpen.be/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '2 months ago',
			status: 'verified',
			hasScreenshot: false
		}
	]);

	// Search state
	let searchQuery = $state('');
	let showSearch = $state(false);

	// Undo state
	let undoItem = $state<{ image: Image; action: 'rejected' } | null>(null);
	let undoTimeout: ReturnType<typeof setTimeout> | null = null;

	// Review modal state (for 4+ items)
	let showReviewModal = $state(false);
	let reviewIndex = $state(0);

	// Filter state
	type FilterOption = 'all' | 'this-month' | 'has-screenshot';
	let activeFilter = $state<FilterOption>('all');

	// Computed
	const filteredImages = $derived(() => {
		let images = verifiedImages;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			images = images.filter(img =>
				img.title.toLowerCase().includes(query) ||
				img.site.toLowerCase().includes(query)
			);
		}

		if (activeFilter === 'has-screenshot') {
			images = images.filter(img => img.hasScreenshot);
		}

		return images;
	});

	const showInlineReview = $derived(pendingImages.length > 0 && pendingImages.length <= 3);
	const showReviewButton = $derived(pendingImages.length > 3);

	function verifyImage(id: number) {
		const image = pendingImages.find(img => img.id === id);
		if (image) {
			pendingImages = pendingImages.filter(img => img.id !== id);
			verifiedImages = [{ ...image, status: 'verified' }, ...verifiedImages];
		}
	}

	function rejectImage(id: number) {
		const image = pendingImages.find(img => img.id === id);
		if (image) {
			pendingImages = pendingImages.filter(img => img.id !== id);

			if (undoTimeout) clearTimeout(undoTimeout);
			undoItem = { image, action: 'rejected' };
			undoTimeout = setTimeout(() => {
				undoItem = null;
			}, 5000);
		}
	}

	function undoReject() {
		if (undoItem) {
			pendingImages = [undoItem.image, ...pendingImages];
			undoItem = null;
			if (undoTimeout) clearTimeout(undoTimeout);
		}
	}

	function openReviewModal() {
		reviewIndex = 0;
		showReviewModal = true;
	}

	function closeReviewModal() {
		showReviewModal = false;
		reviewIndex = 0;
	}

	function reviewNext() {
		if (reviewIndex < pendingImages.length - 1) {
			reviewIndex++;
		} else {
			closeReviewModal();
		}
	}

	function verifyInReview() {
		const image = pendingImages[reviewIndex];
		if (image) {
			verifyImage(image.id);
			if (pendingImages.length === 0) {
				closeReviewModal();
			} else if (reviewIndex >= pendingImages.length) {
				reviewIndex = pendingImages.length - 1;
			}
		}
	}

	function rejectInReview() {
		const image = pendingImages[reviewIndex];
		if (image) {
			rejectImage(image.id);
			if (pendingImages.length === 0) {
				closeReviewModal();
			} else if (reviewIndex >= pendingImages.length) {
				reviewIndex = pendingImages.length - 1;
			}
		}
	}

	function toggleSearch() {
		showSearch = !showSearch;
		if (!showSearch) {
			searchQuery = '';
		}
	}

	// Group images into rows (4 columns on desktop)
	const COLS = 4;
	const imageRows = $derived(() => {
		const images = filteredImages();
		const rows: Image[][] = [];
		for (let i = 0; i < images.length; i += COLS) {
			rows.push(images.slice(i, i + COLS));
		}
		return rows;
	});

	// Check if selected image is in a specific row
	function isSelectedInRow(row: Image[]): boolean {
		return selectedImage !== null && row.some(img => img.id === selectedImage?.id);
	}
</script>

<svelte:head>
	<title>Dashboard - Facetracker</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<div class="max-w-6xl mx-auto px-6 py-8">

		<!-- Review Section: Dark accent block like homepage -->
		{#if showInlineReview}
			<section class="mb-10">
				<div class="rounded-2xl bg-slate-900 text-white p-8">
					<div class="flex items-center gap-3 mb-6">
						<div class="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<div>
							<p class="text-blue-400 text-sm font-medium">We found</p>
							<h2 class="text-2xl font-semibold">
								{pendingImages.length} new image{pendingImages.length !== 1 ? 's' : ''}
							</h2>
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each pendingImages as image (image.id)}
							<div class="bg-white rounded-xl overflow-hidden">
								<div class="aspect-[4/3] relative">
									<img
										src={image.imageUrl}
										alt={image.title}
										class="absolute inset-0 w-full h-full object-cover"
									/>
								</div>
								<div class="p-4">
									<p class="font-medium text-slate-900 truncate">{image.site}</p>
									{#if image.summary}
										<p class="text-xs text-slate-400 mt-0.5 line-clamp-2">{image.summary}</p>
									{/if}
									<p class="text-sm text-slate-500 mt-2 mb-4">
										{image.foundDate} ·
										<a href={image.url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
											View page
										</a>
									</p>
									<div class="flex gap-2">
										<button
											onclick={() => rejectImage(image.id)}
											class="flex-1 px-3 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
										>
											Not me
										</button>
										<button
											onclick={() => verifyImage(image.id)}
											class="flex-1 px-3 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
										>
											Yes, it's me
										</button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>
		{:else if showReviewButton}
			<section class="mb-10">
				<div class="rounded-2xl bg-slate-900 text-white p-6">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="flex -space-x-2">
								{#each pendingImages.slice(0, 4) as image (image.id)}
									<div class="w-12 h-12 rounded-lg border-2 border-slate-900 overflow-hidden">
										<img src={image.imageUrl} alt="" class="w-full h-full object-cover" />
									</div>
								{/each}
								{#if pendingImages.length > 4}
									<div class="w-12 h-12 rounded-lg border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-sm font-medium">
										+{pendingImages.length - 4}
									</div>
								{/if}
							</div>
							<div>
								<p class="text-blue-400 text-sm font-medium">We found</p>
								<p class="text-lg font-semibold">{pendingImages.length} new images</p>
							</div>
						</div>
						<button
							onclick={openReviewModal}
							class="px-5 py-2.5 text-sm font-medium bg-white text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
						>
							Review all
						</button>
					</div>
				</div>
			</section>
		{:else if pendingImages.length === 0 && verifiedImages.length > 0}
			<section class="mb-10">
				<div class="rounded-2xl bg-slate-50 border border-slate-200 p-5">
					<div class="flex items-center gap-4">
						<div class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
							<svg class="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<div>
							<p class="font-medium text-slate-900">All caught up</p>
							<p class="text-sm text-slate-500">Scanning for new images · Last checked 5 min ago</p>
						</div>
					</div>
				</div>
			</section>
		{/if}

		<!-- Collection Section -->
		<section>
			<!-- Header -->
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<div>
					<h2 class="text-2xl font-semibold text-slate-900">Your collection</h2>
					<p class="text-slate-500 mt-1">{filteredImages().length} pages</p>
				</div>

				<div class="flex items-center gap-3">
					<select
						bind:value={activeFilter}
						class="px-4 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All images</option>
						<option value="this-month">This month</option>
						<option value="has-screenshot">With screenshot</option>
					</select>

					{#if showSearch}
						<div class="relative">
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search..."
								class="w-44 sm:w-56 pl-4 pr-10 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								onclick={toggleSearch}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{:else}
						<button
							onclick={toggleSearch}
							class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>
					{/if}
				</div>
			</div>

			<!-- Image Grid - Row based -->
			{#if filteredImages().length > 0}
				<div class="space-y-4">
					{#each imageRows() as row, rowIndex}
						<!-- Row of images -->
						<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
							{#each row as image (image.id)}
								<button
									onclick={() => selectImage(selectedImage?.id === image.id ? null : image)}
									class="group rounded-2xl bg-white border overflow-hidden transition-all text-left relative {image.isOffline ? 'border-slate-300 opacity-75' : 'border-slate-200 hover:shadow-lg hover:border-slate-300'}"
								>
									<div class="aspect-[4/3] relative bg-slate-100">
										<img
											src={image.imageUrl}
											alt={image.title}
											class="absolute inset-0 w-full h-full object-cover {image.isOffline ? 'grayscale' : ''}"
										/>
										{#if image.isOffline}
											<div class="absolute top-2 left-2">
												<span class="px-2 py-1 text-xs font-medium bg-slate-800/90 backdrop-blur text-white rounded-lg flex items-center gap-1">
													<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
													</svg>
													Offline
												</span>
											</div>
										{/if}

										<!-- Selected overlay -->
										{#if selectedImage?.id === image.id}
											<div class="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
												<div class="text-center text-white">
													<svg class="h-8 w-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
													</svg>
													<span class="text-sm font-medium">Viewing</span>
												</div>
											</div>
										{/if}
									</div>
									<div class="p-4 {selectedImage?.id === image.id ? 'bg-slate-950 text-white' : ''}">
										<p class="font-medium text-sm truncate transition-colors {selectedImage?.id === image.id ? 'text-white' : image.isOffline ? 'text-slate-500' : 'text-slate-900 group-hover:text-blue-600'}">{image.site}</p>
										<div class="flex items-center gap-2 mt-1">
											<span class="text-xs {selectedImage?.id === image.id ? 'text-slate-400' : 'text-slate-500'}">{image.foundDate}</span>
											{#if image.hasScreenshot && !image.isOffline}
												<span class="flex items-center gap-1 text-xs {selectedImage?.id === image.id ? 'text-emerald-400' : 'text-emerald-600'}">
													<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
													</svg>
													Archived
												</span>
											{/if}
										</div>
									</div>
								</button>
							{/each}
						</div>

						<!-- Detail panel appears after the row containing selected image -->
						{#if isSelectedInRow(row) && selectedImage}
							<div class="bg-slate-950 rounded-2xl text-white overflow-hidden detail-panel">
								<div class="p-6">
									<div class="flex flex-col lg:flex-row gap-6">
										<!-- Left: Image & Screenshot -->
										<div class="lg:w-2/5 space-y-4">
											<div class="rounded-xl overflow-hidden">
												<img
													src={selectedImage.imageUrl}
													alt={selectedImage.title}
													class="w-full aspect-video object-cover {selectedImage.isOffline ? 'grayscale' : ''}"
												/>
											</div>

											{#if selectedImage.hasScreenshot && selectedImage.screenshotUrl}
												<div class="detail-content">
													<p class="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Page Screenshot</p>
													<div class="rounded-xl overflow-hidden bg-slate-900 max-h-64 overflow-y-auto">
														<img
															src={selectedImage.screenshotUrl}
															alt="Screenshot of {selectedImage.site}"
															class="w-full {selectedImage.isOffline ? 'grayscale' : ''}"
														/>
													</div>
												</div>
											{/if}
										</div>

										<!-- Right: Details -->
										<div class="lg:w-3/5 space-y-5 detail-content">
											<!-- Header with close -->
											<div class="flex items-start justify-between">
												<div>
													<div class="flex items-center gap-2 mb-2">
														<h3 class="text-xl font-semibold">{selectedImage.site}</h3>
														{#if selectedImage.hasScreenshot && !selectedImage.isOffline}
															<span class="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full">
																<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
																</svg>
																Archived
															</span>
														{/if}
														{#if selectedImage.isOffline}
															<span class="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-slate-400 bg-slate-400/10 rounded-full">
																Offline
															</span>
														{/if}
													</div>
													<p class="text-sm text-slate-400 break-all">{selectedImage.url}</p>
													<p class="text-xs text-slate-500 mt-1">Found {selectedImage.foundDate}</p>
												</div>
												<button
													onclick={closeDetail}
													class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
												>
													<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</div>

											<!-- Summary -->
											<div>
												<p class="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Summary</p>
												<p class="text-sm text-slate-300 leading-relaxed">
													{selectedImage.fullSummary || selectedImage.summary || 'No summary available for this page.'}
												</p>
											</div>

											<!-- Portrayal -->
											{#if selectedImage.portrayal}
												<div>
													<p class="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">How you're portrayed</p>
													<div class="flex items-center gap-2">
														{#if selectedImage.portrayal.type === 'praised'}
															<span class="w-2 h-2 rounded-full bg-emerald-400"></span>
															<p class="text-sm text-emerald-400">{selectedImage.portrayal.text}</p>
														{:else if selectedImage.portrayal.type === 'criticized'}
															<span class="w-2 h-2 rounded-full bg-red-400"></span>
															<p class="text-sm text-red-400">{selectedImage.portrayal.text}</p>
														{:else if selectedImage.portrayal.type === 'quoted'}
															<span class="w-2 h-2 rounded-full bg-blue-400"></span>
															<p class="text-sm text-blue-400">{selectedImage.portrayal.text}</p>
														{:else}
															<span class="w-2 h-2 rounded-full bg-slate-400"></span>
															<p class="text-sm text-slate-400">{selectedImage.portrayal.text}</p>
														{/if}
													</div>
												</div>
											{/if}

											<!-- Reach -->
											{#if selectedImage.reach}
												<div>
													<div class="flex items-center gap-2 mb-2">
														<p class="text-xs font-medium text-slate-400 uppercase tracking-wide">Estimated Reach</p>
														<div class="relative group/tooltip">
															<svg class="h-3.5 w-3.5 text-slate-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
															</svg>
															<div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
																These are estimates based on third-party data
															</div>
														</div>
													</div>
													<div class="flex flex-wrap gap-4">
														{#if selectedImage.reach.siteMonthlyVisits}
															<div class="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
																<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
																</svg>
																<div>
																	<p class="text-sm font-medium text-white">{selectedImage.reach.siteMonthlyVisits}</p>
																	<p class="text-xs text-slate-500">monthly visits</p>
																</div>
															</div>
														{/if}
														{#if selectedImage.reach.social?.facebook}
															<div class="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
																<svg class="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
																	<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
																</svg>
																<div class="flex items-center gap-3">
																	<div class="text-center">
																		<p class="text-sm font-medium text-white">{selectedImage.reach.social.facebook.reactions}</p>
																		<p class="text-xs text-slate-500">likes</p>
																	</div>
																	<div class="w-px h-6 bg-slate-700"></div>
																	<div class="text-center">
																		<p class="text-sm font-medium text-white">{selectedImage.reach.social.facebook.shares}</p>
																		<p class="text-xs text-slate-500">shares</p>
																	</div>
																	<div class="w-px h-6 bg-slate-700"></div>
																	<div class="text-center">
																		<p class="text-sm font-medium text-white">{selectedImage.reach.social.facebook.comments}</p>
																		<p class="text-xs text-slate-500">comments</p>
																	</div>
																</div>
															</div>
														{/if}
														{#if selectedImage.reach.social?.pinterest}
															<div class="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
																<svg class="h-4 w-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
																	<path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
																</svg>
																<div>
																	<p class="text-sm font-medium text-white">{selectedImage.reach.social.pinterest}</p>
																	<p class="text-xs text-slate-500">pins</p>
																</div>
															</div>
														{/if}
													</div>
												</div>
											{/if}

											<!-- Actions -->
											<div class="flex gap-3 pt-2">
												<a
													href={selectedImage.url}
													target="_blank"
													rel="noopener noreferrer"
													class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
												>
													<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
													</svg>
													Visit page
												</a>
												{#if !selectedImage.hasScreenshot && !selectedImage.isOffline}
													<button class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors">
														<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
														</svg>
														Archive now
													</button>
												{/if}
											</div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>

<style>
	.detail-panel {
		animation: expandPanel 0.3s ease-out;
	}

	.detail-content {
		animation: fadeIn 0.3s ease-out 0.15s both;
	}

	@keyframes expandPanel {
		from {
			opacity: 0;
			max-height: 0;
			padding-top: 0;
			padding-bottom: 0;
		}
		to {
			opacity: 1;
			max-height: 800px;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
			{:else if verifiedImages.length === 0}
				<!-- Empty state -->
				<div class="text-center py-20">
					<div class="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
						<svg class="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">Start your collection</h3>
					<p class="text-slate-600 mb-8 max-w-md mx-auto">
						Add a page where you appear, or upload reference photos so we can find images for you.
					</p>
					<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
						<a
							href="/app/add"
							class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
							Add a page
						</a>
						<a
							href="/app/reference"
							class="inline-flex items-center gap-2 px-6 py-3 text-slate-700 font-medium border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
						>
							Upload reference photos
						</a>
					</div>
				</div>
			{:else}
				<div class="text-center py-12">
					<p class="text-slate-500">No images match your search.</p>
					<button
						onclick={() => { searchQuery = ''; activeFilter = 'all'; }}
						class="mt-2 text-blue-600 hover:underline text-sm"
					>
						Clear filters
					</button>
				</div>
			{/if}
		</section>
	</div>
</div>

<!-- Undo Toast -->
{#if undoItem}
	<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
		<div class="flex items-center gap-4 px-5 py-3 bg-slate-900 text-white rounded-xl shadow-lg">
			<span class="text-sm">Marked as not you</span>
			<button
				onclick={undoReject}
				class="text-sm font-medium text-blue-400 hover:text-blue-300"
			>
				Undo
			</button>
		</div>
	</div>
{/if}

<!-- Review Modal -->
{#if showReviewModal && pendingImages.length > 0}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<button
			class="absolute inset-0 bg-black/50"
			onclick={closeReviewModal}
			aria-label="Close"
		></button>

		<div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
			<div class="flex items-center justify-between px-5 py-4 border-b border-slate-200">
				<button
					onclick={closeReviewModal}
					class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<span class="text-sm font-medium text-slate-500">{reviewIndex + 1} of {pendingImages.length}</span>
				<button
					onclick={reviewNext}
					class="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
				>
					Skip
				</button>
			</div>

			{#if pendingImages[reviewIndex]}
				{@const currentImage = pendingImages[reviewIndex]}
				<div class="p-5">
					<div class="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-5">
						<img
							src={currentImage.imageUrl}
							alt={currentImage.title}
							class="w-full h-full object-cover"
						/>
					</div>

					<div class="text-center mb-5">
						<p class="font-semibold text-slate-900 text-lg">{currentImage.site}</p>
						{#if currentImage.summary}
							<p class="text-xs text-slate-400 mt-1">{currentImage.summary}</p>
						{/if}
						<p class="text-sm text-slate-500 mt-2">Found {currentImage.foundDate}</p>
						<a
							href={currentImage.url}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-block mt-2 text-sm text-blue-600 hover:underline"
						>
							View original page
						</a>
					</div>

					<div class="flex gap-3">
						<button
							onclick={rejectInReview}
							class="flex-1 px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
						>
							Not me
						</button>
						<button
							onclick={verifyInReview}
							class="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
						>
							Yes, it's me
						</button>
					</div>
				</div>

				<div class="h-1 bg-slate-100">
					<div
						class="h-full bg-blue-600 transition-all duration-300"
						style="width: {((reviewIndex + 1) / pendingImages.length) * 100}%"
					></div>
				</div>
			{/if}
		</div>
	</div>
{/if}

