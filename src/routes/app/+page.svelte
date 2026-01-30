<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		showAddModal,
		closeAddModal as closeAddModalStore,
		openAddModal
	} from '$lib/stores/addModal';

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

	// Add page modal
	let addUrl = $state('');
	let addLoading = $state(false);
	let addSuccess = $state(false);

	function closeAddModal() {
		closeAddModalStore();
		addUrl = '';
		addLoading = false;
		addSuccess = false;
	}

	async function handleAddSubmit(event: SubmitEvent) {
		event.preventDefault();
		addLoading = true;
		await new Promise((resolve) => setTimeout(resolve, 1500));
		addSuccess = true;
		addLoading = false;
	}

	// Takedown request modal
	let showTakedownModal = $state(false);
	let takedownImage = $state<Image | null>(null);
	let takedownReason = $state('');
	let takedownDetails = $state('');
	let takedownLoading = $state(false);
	let takedownSuccess = $state(false);

	const takedownReasons = [
		{
			id: 'unauthorized',
			label: 'Used without my permission',
			description: 'The image is being used without proper authorization'
		},
		{
			id: 'misrepresents',
			label: 'Misrepresents me',
			description: 'The context or caption is false or misleading'
		},
		{
			id: 'commercial',
			label: 'Selling something using my image',
			description: 'Used for advertising or commercial purposes without consent'
		},
		{
			id: 'privacy',
			label: 'Violates my privacy',
			description: "Shows private moments or locations I didn't consent to share"
		},
		{
			id: 'outdated',
			label: 'Outdated and want it removed',
			description: 'Old content that no longer represents me'
		},
		{ id: 'other', label: 'Other reason', description: 'Something else not listed above' }
	];

	function openTakedownModal(image: Image) {
		takedownImage = image;
		takedownReason = '';
		takedownDetails = '';
		takedownSuccess = false;
		showTakedownModal = true;
	}

	function closeTakedownModal() {
		showTakedownModal = false;
		takedownImage = null;
		takedownReason = '';
		takedownDetails = '';
		takedownLoading = false;
		takedownSuccess = false;
	}

	async function handleTakedownSubmit() {
		if (!takedownReason) return;
		takedownLoading = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		takedownSuccess = true;
		takedownLoading = false;
	}

	// Demo data
	let pendingImages = $state<Image[]>([
		{
			id: 101,
			title: 'Belgian PM at EU Summit',
			site: 'VRT News',
			url: 'https://www.vrt.be/vrtnws/nl/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '2 hours ago',
			status: 'pending',
			hasScreenshot: true,
			summary:
				'News article about EU summit meeting with European leaders. You are featured as the key speaker in negotiations.'
		},
		{
			id: 102,
			title: 'De Wever reageert op economisch plan',
			site: 'De Standaard',
			url: 'https://www.standaard.be/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: 'Yesterday',
			status: 'pending',
			hasScreenshot: true,
			summary:
				"Opinion piece discussing government economic policy reforms. You are quoted criticizing the opposition's budget proposal."
		}
	]);

	let verifiedImages = $state<Image[]>([
		{
			id: 1,
			title: 'Bart De Wever over de regeringsvorming',
			site: 'De Standaard',
			url: 'https://www.standaard.be/cnt/dmf20250110_97845632',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			screenshotUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '2 days ago',
			status: 'verified',
			hasScreenshot: true,
			summary:
				'Interview about coalition negotiations. You are the main subject discussing formation progress.',
			fullSummary:
				'In-depth interview with De Standaard about the ongoing government formation process. The article covers your views on coalition partnerships, policy priorities, and timeline expectations. You are quoted extensively on economic reforms and institutional changes. The piece includes reactions from other party leaders.',
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
			}
		},
		{
			id: 2,
			title: 'Premier De Wever bezoekt Kyiv',
			site: 'VRT NWS',
			url: 'https://www.vrt.be/vrtnws/nl/2024/06/09/bart-de-wever-n-va/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			screenshotUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '4 days ago',
			status: 'verified',
			hasScreenshot: true,
			summary:
				'Coverage of diplomatic visit to Ukraine. You are shown meeting with Ukrainian officials.',
			fullSummary:
				'VRT News report on your official visit to Kyiv as part of EU diplomatic efforts. The article covers meetings with President Zelensky and discussions about continued Belgian support for Ukraine. Includes footage from press conference and bilateral meetings. Your statements on military aid and reconstruction efforts are highlighted.',
			portrayal: {
				type: 'quoted',
				text: "Quoted on Belgium's continued support for Ukraine"
			},
			reach: {
				siteMonthlyVisits: '12.4M',
				social: {
					facebook: { shares: 1420, comments: 356, reactions: 2891 }
				}
			}
		},
		{
			id: 3,
			title: 'N-VA campagnefoto gebruikt op sociale media',
			site: 'The Brussels Times',
			url: 'https://www.brusselstimes.com/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			screenshotUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '1 week ago',
			status: 'verified',
			hasScreenshot: true,
			summary:
				'Analysis of party social media strategy. Your official portrait is used as an example.',
			fullSummary:
				'The Brussels Times analysis of how Belgian political parties use social media for campaigning. Your official campaign photos are featured as examples of effective political branding. The article discusses image strategy, messaging consistency, and digital outreach methods used by N-VA.',
			portrayal: {
				type: 'mentioned',
				text: 'Mentioned as an example of effective political branding'
			}
		},
		{
			id: 4,
			title: 'Interview: De toekomst van België',
			site: 'RTBF',
			url: 'https://www.rtbf.be/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '2 weeks ago',
			status: 'verified',
			hasScreenshot: false,
			fullSummary:
				'RTBF opinion piece discussing the future of Belgium and federal reform proposals. The article takes a critical stance on confederalism plans and questions the economic viability of proposed institutional changes.',
			portrayal: {
				type: 'criticized',
				text: 'Criticized for your confederalism proposals'
			},
			reach: {
				siteMonthlyVisits: '5.1M',
				social: {
					facebook: { shares: 89, comments: 234, reactions: 167 }
				}
			}
		},
		{
			id: 5,
			title: 'Burgemeester Antwerpen op persconferentie',
			site: 'Politico Europe',
			url: 'https://www.politico.eu/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
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
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
			foundDate: '3 weeks ago',
			status: 'verified',
			hasScreenshot: false
		},
		{
			id: 7,
			title: 'Bart De Wever in talkshow Vandaag',
			site: 'European Commission',
			url: 'https://audiovisual.ec.europa.eu/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/440px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '1 month ago',
			status: 'verified',
			hasScreenshot: false
		},
		{
			id: 8,
			title: 'Officiële portretfoto op gemeentelijke website',
			site: 'Stad Antwerpen',
			url: 'https://www.antwerpen.be/',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/440px-BartDeWever.jpg',
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
			images = images.filter(
				(img) => img.title.toLowerCase().includes(query) || img.site.toLowerCase().includes(query)
			);
		}

		if (activeFilter === 'has-screenshot') {
			images = images.filter((img) => img.hasScreenshot);
		}

		return images;
	});

	const showInlineReview = $derived(pendingImages.length > 0 && pendingImages.length <= 3);
	const showReviewButton = $derived(pendingImages.length > 3);

	function verifyImage(id: number) {
		const image = pendingImages.find((img) => img.id === id);
		if (image) {
			pendingImages = pendingImages.filter((img) => img.id !== id);
			verifiedImages = [{ ...image, status: 'verified' }, ...verifiedImages];
		}
	}

	function rejectImage(id: number) {
		const image = pendingImages.find((img) => img.id === id);
		if (image) {
			pendingImages = pendingImages.filter((img) => img.id !== id);

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
		return selectedImage !== null && row.some((img) => img.id === selectedImage?.id);
	}
</script>

<svelte:head>
	<title>Dashboard - Facetracker</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<div class="mx-auto max-w-6xl px-6 py-8">
		<!-- Review Section: Dark accent block like homepage -->
		{#if showInlineReview}
			<section class="mb-10">
				<div class="rounded-2xl bg-slate-900 p-8 text-white">
					<div class="mb-6 flex items-center gap-3">
						<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-sm font-medium text-blue-400">We found</p>
							<h2 class="text-2xl font-semibold">
								{pendingImages.length} new image{pendingImages.length !== 1 ? 's' : ''}
							</h2>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{#each pendingImages as image (image.id)}
							<div class="overflow-hidden rounded-xl bg-white">
								<div class="relative aspect-[4/3]">
									<img
										src={image.imageUrl}
										alt={image.title}
										class="absolute inset-0 h-full w-full object-cover"
									/>
								</div>
								<div class="p-4">
									<p class="truncate font-medium text-slate-900">{image.site}</p>
									{#if image.summary}
										<p class="mt-0.5 line-clamp-2 text-xs text-slate-400">{image.summary}</p>
									{/if}
									<p class="mb-4 mt-2 text-sm text-slate-500">
										{image.foundDate} ·
										<a
											href={image.url}
											target="_blank"
											rel="noopener noreferrer"
											class="text-blue-600 hover:underline"
										>
											View page
										</a>
									</p>
									<div class="flex gap-2">
										<button
											onclick={() => rejectImage(image.id)}
											class="flex-1 rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
										>
											Not me
										</button>
										<button
											onclick={() => verifyImage(image.id)}
											class="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
				<div class="rounded-2xl bg-slate-900 p-6 text-white">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="flex -space-x-2">
								{#each pendingImages.slice(0, 4) as image (image.id)}
									<div class="h-12 w-12 overflow-hidden rounded-lg border-2 border-slate-900">
										<img src={image.imageUrl} alt="" class="h-full w-full object-cover" />
									</div>
								{/each}
								{#if pendingImages.length > 4}
									<div
										class="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-slate-900 bg-slate-700 text-sm font-medium"
									>
										+{pendingImages.length - 4}
									</div>
								{/if}
							</div>
							<div>
								<p class="text-sm font-medium text-blue-400">We found</p>
								<p class="text-lg font-semibold">{pendingImages.length} new images</p>
							</div>
						</div>
						<button
							onclick={openReviewModal}
							class="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
						>
							Review all
						</button>
					</div>
				</div>
			</section>
		{:else if pendingImages.length === 0 && verifiedImages.length > 0}
			<section class="mb-10">
				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
					<div class="flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
							<svg
								class="h-5 w-5 text-emerald-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
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
			<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 class="text-2xl font-semibold text-slate-900">Your collection</h2>
					<p class="mt-1 text-slate-500">{filteredImages().length} pages</p>
				</div>

				<div class="flex items-center gap-3">
					<select
						bind:value={activeFilter}
						class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
								class="w-44 rounded-xl border border-slate-200 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-56"
							/>
							<button
								onclick={toggleSearch}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					{:else}
						<button
							onclick={toggleSearch}
							class="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
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
						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
							{#each row as image (image.id)}
								<button
									onclick={() => selectImage(selectedImage?.id === image.id ? null : image)}
									class="group relative overflow-hidden rounded-2xl border bg-white text-left transition-all {image.isOffline
										? 'border-slate-300 opacity-75'
										: 'border-slate-200 hover:border-slate-300 hover:shadow-lg'}"
								>
									<div class="relative aspect-[4/3] bg-slate-100">
										<img
											src={image.imageUrl}
											alt={image.title}
											class="absolute inset-0 h-full w-full object-cover {image.isOffline
												? 'grayscale'
												: ''}"
										/>
										{#if image.isOffline}
											<div class="absolute left-2 top-2">
												<span
													class="flex items-center gap-1 rounded-lg bg-slate-800/90 px-2 py-1 text-xs font-medium text-white backdrop-blur"
												>
													<svg
														class="h-3 w-3"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
														/>
													</svg>
													Offline
												</span>
											</div>
										{/if}

										<!-- Selected overlay -->
										{#if selectedImage?.id === image.id}
											<div
												class="absolute inset-0 flex items-center justify-center bg-slate-950/80"
											>
												<div class="text-center text-white">
													<svg
														class="mx-auto mb-2 h-8 w-8"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
													<span class="text-sm font-medium">Viewing</span>
												</div>
											</div>
										{/if}
									</div>
									<div
										class="p-4 {selectedImage?.id === image.id ? 'bg-slate-950 text-white' : ''}"
									>
										<p
											class="truncate text-sm font-medium transition-colors {selectedImage?.id ===
											image.id
												? 'text-white'
												: image.isOffline
													? 'text-slate-500'
													: 'text-slate-900 group-hover:text-blue-600'}"
										>
											{image.site}
										</p>
										<div class="mt-1 flex items-center gap-2">
											<span
												class="text-xs {selectedImage?.id === image.id
													? 'text-slate-400'
													: 'text-slate-500'}">{image.foundDate}</span
											>
											{#if image.hasScreenshot && !image.isOffline}
												<span
													class="flex items-center gap-1 text-xs {selectedImage?.id === image.id
														? 'text-emerald-400'
														: 'text-emerald-600'}"
												>
													<svg
														class="h-3 w-3"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M5 13l4 4L19 7"
														/>
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
							<div class="detail-panel overflow-hidden rounded-2xl bg-slate-950 text-white">
								<div class="p-6">
									<div class="flex flex-col gap-6 lg:flex-row">
										<!-- Left: Image & Screenshot -->
										<div class="space-y-4 lg:w-2/5">
											<div class="overflow-hidden rounded-xl">
												<img
													src={selectedImage.imageUrl}
													alt={selectedImage.title}
													class="aspect-video w-full object-cover {selectedImage.isOffline
														? 'grayscale'
														: ''}"
												/>
											</div>

											{#if selectedImage.hasScreenshot && selectedImage.screenshotUrl}
												<div class="detail-content">
													<p
														class="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400"
													>
														Page Screenshot
													</p>
													<div
														class="max-h-64 overflow-hidden overflow-y-auto rounded-xl bg-slate-900"
													>
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
										<div class="detail-content flex flex-col lg:w-3/5">
											<div class="flex-1 space-y-5">
												<!-- Header with close -->
												<div class="flex items-start justify-between">
													<div>
														<div class="mb-2 flex items-center gap-2">
															<h3 class="text-xl font-semibold">{selectedImage.site}</h3>
															{#if selectedImage.hasScreenshot && !selectedImage.isOffline}
																<span
																	class="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-400"
																>
																	<svg
																		class="h-3 w-3"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="2"
																			d="M5 13l4 4L19 7"
																		/>
																	</svg>
																	Archived
																</span>
															{/if}
															{#if selectedImage.isOffline}
																<span
																	class="flex items-center gap-1 rounded-full bg-slate-400/10 px-2 py-0.5 text-xs font-medium text-slate-400"
																>
																	Offline
																</span>
															{/if}
														</div>
														<p class="break-all text-sm text-slate-400">{selectedImage.url}</p>
														<p class="mt-1 text-xs text-slate-500">
															Found {selectedImage.foundDate}
														</p>
													</div>
													<button
														onclick={closeDetail}
														class="flex-shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
													>
														<svg
															class="h-5 w-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M6 18L18 6M6 6l12 12"
															/>
														</svg>
													</button>
												</div>

												<!-- Summary -->
												<div>
													<p
														class="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400"
													>
														Summary
													</p>
													<p class="text-sm leading-relaxed text-slate-300">
														{selectedImage.fullSummary ||
															selectedImage.summary ||
															'No summary available for this page.'}
													</p>
												</div>

												<!-- Portrayal -->
												{#if selectedImage.portrayal}
													<div>
														<p
															class="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400"
														>
															How you're portrayed
														</p>
														<div class="flex items-center gap-2">
															{#if selectedImage.portrayal.type === 'praised'}
																<span class="h-2 w-2 rounded-full bg-emerald-400"></span>
																<p class="text-sm text-emerald-400">
																	{selectedImage.portrayal.text}
																</p>
															{:else if selectedImage.portrayal.type === 'criticized'}
																<span class="h-2 w-2 rounded-full bg-red-400"></span>
																<p class="text-sm text-red-400">{selectedImage.portrayal.text}</p>
															{:else if selectedImage.portrayal.type === 'quoted'}
																<span class="h-2 w-2 rounded-full bg-blue-400"></span>
																<p class="text-sm text-blue-400">{selectedImage.portrayal.text}</p>
															{:else}
																<span class="h-2 w-2 rounded-full bg-slate-400"></span>
																<p class="text-sm text-slate-400">{selectedImage.portrayal.text}</p>
															{/if}
														</div>
													</div>
												{/if}

												<!-- Reach -->
												{#if selectedImage.reach}
													<div>
														<div class="mb-2 flex items-center gap-2">
															<p class="text-xs font-medium uppercase tracking-wide text-slate-400">
																Estimated Reach
															</p>
															<div class="group/tooltip relative">
																<svg
																	class="h-3.5 w-3.5 cursor-help text-slate-500"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="2"
																		d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
																	/>
																</svg>
																<div
																	class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300 opacity-0 transition-opacity group-hover/tooltip:opacity-100"
																>
																	These are estimates based on third-party data
																</div>
															</div>
														</div>
														<div class="flex flex-wrap gap-4">
															{#if selectedImage.reach.siteMonthlyVisits}
																<div
																	class="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2"
																>
																	<svg
																		class="h-4 w-4 text-slate-400"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="2"
																			d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
																		/>
																	</svg>
																	<div>
																		<p class="text-sm font-medium text-white">
																			{selectedImage.reach.siteMonthlyVisits}
																		</p>
																		<p class="text-xs text-slate-500">monthly visits</p>
																	</div>
																</div>
															{/if}
															{#if selectedImage.reach.social?.facebook}
																<div
																	class="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2"
																>
																	<svg
																		class="h-4 w-4 text-blue-400"
																		viewBox="0 0 24 24"
																		fill="currentColor"
																	>
																		<path
																			d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
																		/>
																	</svg>
																	<div class="flex items-center gap-3">
																		<div class="text-center">
																			<p class="text-sm font-medium text-white">
																				{selectedImage.reach.social.facebook.reactions}
																			</p>
																			<p class="text-xs text-slate-500">likes</p>
																		</div>
																		<div class="h-6 w-px bg-slate-700"></div>
																		<div class="text-center">
																			<p class="text-sm font-medium text-white">
																				{selectedImage.reach.social.facebook.shares}
																			</p>
																			<p class="text-xs text-slate-500">shares</p>
																		</div>
																		<div class="h-6 w-px bg-slate-700"></div>
																		<div class="text-center">
																			<p class="text-sm font-medium text-white">
																				{selectedImage.reach.social.facebook.comments}
																			</p>
																			<p class="text-xs text-slate-500">comments</p>
																		</div>
																	</div>
																</div>
															{/if}
															{#if selectedImage.reach.social?.pinterest}
																<div
																	class="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2"
																>
																	<svg
																		class="h-4 w-4 text-red-400"
																		viewBox="0 0 24 24"
																		fill="currentColor"
																	>
																		<path
																			d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
																		/>
																	</svg>
																	<div>
																		<p class="text-sm font-medium text-white">
																			{selectedImage.reach.social.pinterest}
																		</p>
																		<p class="text-xs text-slate-500">pins</p>
																	</div>
																</div>
															{/if}
														</div>
													</div>
												{/if}
											</div>

											<!-- Actions at bottom -->
											<div class="mt-6 flex flex-wrap items-center justify-between gap-3">
												<a
													href={selectedImage.url}
													target="_blank"
													rel="noopener noreferrer"
													class="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
												>
													<svg
														class="h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
														/>
													</svg>
													Visit page
												</a>
												<div class="flex items-center gap-3">
													<button
														onclick={() => openTakedownModal(selectedImage)}
														class="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
													>
														<svg
															class="h-4 w-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
															/>
														</svg>
														Request takedown
													</button>
													{#if !selectedImage.hasScreenshot && !selectedImage.isOffline}
														<button
															class="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
														>
															<svg
																class="h-4 w-4"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="2"
																	d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
																/>
															</svg>
															Archive now
														</button>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{:else if verifiedImages.length === 0}
				<!-- Empty state -->
				<div class="py-20 text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100"
					>
						<svg
							class="h-8 w-8 text-slate-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-slate-900">Start your collection</h3>
					<p class="mx-auto mb-8 max-w-md text-slate-600">
						Add a page where you appear, or upload reference photos so we can find images for you.
					</p>
					<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<button
							onclick={openAddModal}
							class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4v16m8-8H4"
								/>
							</svg>
							Add a page
						</button>
						<a
							href="/app/reference"
							class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
						>
							Upload reference photos
						</a>
					</div>
				</div>
			{:else}
				<div class="py-12 text-center">
					<p class="text-slate-500">No images match your search.</p>
					<button
						onclick={() => {
							searchQuery = '';
							activeFilter = 'all';
						}}
						class="mt-2 text-sm text-blue-600 hover:underline"
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
	<div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
		<div class="flex items-center gap-4 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-lg">
			<span class="text-sm">Marked as not you</span>
			<button onclick={undoReject} class="text-sm font-medium text-blue-400 hover:text-blue-300">
				Undo
			</button>
		</div>
	</div>
{/if}

<!-- Review Modal -->
{#if showReviewModal && pendingImages.length > 0}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<button class="absolute inset-0 bg-black/50" onclick={closeReviewModal} aria-label="Close"
		></button>

		<div class="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
			<div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
				<button
					onclick={closeReviewModal}
					class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<span class="text-sm font-medium text-slate-500"
					>{reviewIndex + 1} of {pendingImages.length}</span
				>
				<button
					onclick={reviewNext}
					class="rounded-lg px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
				>
					Skip
				</button>
			</div>

			{#if pendingImages[reviewIndex]}
				{@const currentImage = pendingImages[reviewIndex]}
				<div class="p-5">
					<div class="mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
						<img
							src={currentImage.imageUrl}
							alt={currentImage.title}
							class="h-full w-full object-cover"
						/>
					</div>

					<div class="mb-5 text-center">
						<p class="text-lg font-semibold text-slate-900">{currentImage.site}</p>
						{#if currentImage.summary}
							<p class="mt-1 text-xs text-slate-400">{currentImage.summary}</p>
						{/if}
						<p class="mt-2 text-sm text-slate-500">Found {currentImage.foundDate}</p>
						<a
							href={currentImage.url}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-2 inline-block text-sm text-blue-600 hover:underline"
						>
							View original page
						</a>
					</div>

					<div class="flex gap-3">
						<button
							onclick={rejectInReview}
							class="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
						>
							Not me
						</button>
						<button
							onclick={verifyInReview}
							class="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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

<!-- Add Page Modal -->
{#if $showAddModal}
	<div class="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20">
		<!-- Backdrop -->
		<button
			class="add-backdrop fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
			onclick={closeAddModal}
			aria-label="Close"
		></button>

		<!-- Modal -->
		<div class="add-modal relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
			<!-- Close button -->
			<button
				onclick={closeAddModal}
				class="absolute right-4 top-4 z-10 rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
				aria-label="Close"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<div class="p-6">
				{#if addSuccess}
					<!-- Success State -->
					<div class="add-success py-4 text-center">
						<div
							class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100"
						>
							<svg
								class="h-7 w-7 text-emerald-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h2 class="mb-2 text-xl font-semibold text-slate-900">Page added!</h2>
						<p class="mb-6 text-slate-600">It'll appear in your collection shortly.</p>
						<div class="flex justify-center gap-3">
							<button
								onclick={() => {
									addSuccess = false;
									addUrl = '';
								}}
								class="rounded-xl bg-slate-100 px-4 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-200"
							>
								Add another
							</button>
							<button
								onclick={closeAddModal}
								class="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700"
							>
								Done
							</button>
						</div>
					</div>
				{:else}
					<!-- Form -->
					<div class="mb-5">
						<h2 class="text-xl font-bold text-slate-900">Add a page</h2>
						<p class="mt-1 text-sm text-slate-600">Found yourself somewhere online?</p>
					</div>

					<form onsubmit={handleAddSubmit} class="space-y-4">
						<div>
							<input
								type="url"
								bind:value={addUrl}
								placeholder="Paste URL here..."
								required
								disabled={addLoading}
								class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-500"
							/>
						</div>

						<button
							type="submit"
							disabled={addLoading || !addUrl}
							class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
						>
							{#if addLoading}
								<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Adding...
							{:else}
								Add to collection
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Takedown Request Modal -->
{#if showTakedownModal && takedownImage}
	<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
		<!-- Backdrop -->
		<div
			class="takedown-backdrop fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
			onclick={closeTakedownModal}
		></div>

		<!-- Modal -->
		<div class="takedown-modal relative my-8 w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
			{#if takedownSuccess}
				<!-- Success State -->
				<div class="p-8 text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
					>
						<svg
							class="h-10 w-10 text-emerald-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h2 class="mb-3 text-2xl font-bold text-slate-900">Request submitted</h2>
					<p class="mx-auto mb-2 max-w-md text-slate-600">
						We've received your takedown request and will handle everything from here.
					</p>
					<p class="mx-auto mb-8 max-w-md text-sm text-slate-500">
						You'll receive an email update when there's progress. Most requests are resolved within
						5-10 business days.
					</p>
					<button
						onclick={closeTakedownModal}
						class="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-800"
					>
						Done
					</button>
				</div>
			{:else}
				<!-- Close button -->
				<button
					onclick={closeTakedownModal}
					class="absolute right-4 top-4 z-10 rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div class="p-8">
					<!-- Header -->
					<div class="mb-8">
						<h2 class="text-2xl font-bold text-slate-900">Request takedown</h2>
						<p class="mt-2 text-slate-600">
							Tell us why you want this removed. We'll handle the rest.
						</p>
					</div>

					<p class="mb-3 text-sm font-medium text-slate-700">Why do you want this removed?</p>
					<div class="flex flex-col gap-8 lg:flex-row">
						<!-- Left: Form -->
						<div class="lg:w-3/5">
							<div class="mb-6 space-y-2">
								{#each takedownReasons as reason}
									<button
										onclick={() => (takedownReason = reason.id)}
										class="flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all {takedownReason ===
										reason.id
											? 'border-blue-500 bg-blue-50'
											: 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}"
									>
										<div class="mt-0.5 flex-shrink-0">
											<div
												class="flex h-5 w-5 items-center justify-center rounded-full border-2 {takedownReason ===
												reason.id
													? 'border-blue-500'
													: 'border-slate-300'}"
											>
												{#if takedownReason === reason.id}
													<div class="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
												{/if}
											</div>
										</div>
										<div>
											<p class="font-medium text-slate-900">{reason.label}</p>
											<p class="text-sm text-slate-500">{reason.description}</p>
										</div>
									</button>
								{/each}
							</div>

							<div class="mb-6">
								<label for="takedown-details" class="mb-2 block text-sm font-medium text-slate-700">
									Anything else we should know? <span class="font-normal text-slate-400"
										>(optional)</span
									>
								</label>
								<textarea
									id="takedown-details"
									bind:value={takedownDetails}
									placeholder="Add any additional context that might help..."
									rows="3"
									class="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
								></textarea>
							</div>

							<!-- Submit -->
							<div class="flex items-center gap-4">
								<button
									onclick={handleTakedownSubmit}
									disabled={!takedownReason || takedownLoading}
									class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
								>
									{#if takedownLoading}
										<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Submitting...
									{:else}
										Request takedown
									{/if}
								</button>
							</div>
						</div>

						<!-- Right: Image preview -->
						<div class="lg:w-2/5">
							<div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
								<img
									src={takedownImage.imageUrl}
									alt={takedownImage.title}
									class="aspect-video w-full object-cover"
								/>
							</div>
							<div class="mt-3">
								<p class="font-medium text-slate-900">{takedownImage.site}</p>
								<p class="truncate text-sm text-slate-500">{takedownImage.url}</p>
							</div>
						</div>
					</div>

					<!-- HR -->
					<hr class="my-6 h-px border-0 bg-black/10" />

					<div class="mx-auto sm:w-full lg:w-3/5">
						<!-- trust message -->
						<p class="mt-4 text-center text-xs text-slate-400">
							we handle the entire process for you - contacting the website, following up, and
							keeping you updated.
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

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

	.add-backdrop {
		animation: fadeIn 0.15s ease-out;
	}

	.add-modal {
		animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: top center;
	}

	.add-success {
		animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.takedown-backdrop {
		animation: fadeIn 0.2s ease-out;
	}

	.takedown-modal {
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
