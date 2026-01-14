<script lang="ts">
	import { page } from '$app/stores';

	type Status = 'pending' | 'confirmed' | 'rejected';

	interface FoundImage {
		id: number;
		title: string;
		site: string;
		url: string;
		imageUrl: string;
		foundDate: string;
		status: Status;
		confidence: number;
		tags: string[];
	}

	let selectedImage = $state<FoundImage | null>(null);
	let selectedTags = $state<string[]>([]);
	let isReviewing = $state(false);
	let reviewQueue = $state<FoundImage[]>([]);
	let currentReviewIndex = $state(0);

	// Get status filter from URL
	const statusFilter = $derived(($page.url.searchParams.get('status') as Status | 'all') || 'all');

	// Selection mode
	let isSelectionMode = $state(false);
	let selectedIds = $state<Set<number>>(new Set());

	// Context menu
	let contextMenu = $state<{ x: number; y: number; imageId: number } | null>(null);

	// Demo data - images we found for Bart De Wever
	let images = $state<FoundImage[]>([
		{
			id: 1,
			title: 'N-VA campagnefoto gebruikt op sociale media',
			site: 'VRT NWS',
			url: 'https://www.vrt.be/vrtnws/nl/2024/06/09/bart-de-wever-n-va/',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg/500px-Visit_of_Bart_De_Wever%2C_Belgian_Prime_Minister%2C_to_the_European_Commission_%28cropped%29.jpg',
			foundDate: '1 week ago',
			status: 'pending',
			confidence: 94,
			tags: ['Press', 'Campaign']
		},
		{
			id: 2,
			title: 'Burgemeester Antwerpen op persconferentie',
			site: 'The Brussels Times',
			url: 'https://www.brusselstimes.com/belgium/1105315/belgium-bart-de-wever-is-officially-prime-minister',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BartDeWever.jpg/1200px-BartDeWever.jpg',
			foundDate: '3 weeks ago',
			status: 'pending',
			confidence: 89,
			tags: ['Press', 'Local']
		},
		{
			id: 3,
			title: 'Foto op N-VA congres gebruikt door derden',
			site: 'RTBF',
			url: 'https://www.rtbf.be/article/gouvernement-de-wever-voici-la-composition-du-futur-executif-federal-11499211',
			imageUrl: 'https://th-i.thgim.com/public/incoming/2ioy7t/article69178561.ece/alternates/LANDSCAPE_1200/Europe_Defense_22111.jpg',
			foundDate: '1 month ago',
			status: 'pending',
			confidence: 76,
			tags: ['Campaign', 'Social']
		},
		{
			id: 4,
			title: 'Oude campagnefoto opgedoken',
			site: 'Reddit',
			url: 'https://www.reddit.com/r/belgium/',
			imageUrl: 'https://ilkha.com/img/NewsGallery/2025/2/3/440773/FeaturedImage/ece773bd-6e57-4b08-a138-70b973f65289.webp',
			foundDate: '3 months ago',
			status: 'pending',
			confidence: 67,
			tags: ['Social']
		},
		{
			id: 5,
			title: 'De Wever tijdens Europese top',
			site: 'Politico Europe',
			url: 'https://www.politico.eu/article/bart-de-wever-belgium-prime-minister/',
			imageUrl: 'https://api.brusselstimes.com/wp-content/uploads/2023/05/2eb78d21-belgaimage-65615242-1024x683.jpg',
			foundDate: '2 weeks ago',
			status: 'confirmed',
			confidence: 98,
			tags: ['Press', 'International']
		},
		{
			id: 6,
			title: 'Belgische premier in Brussel',
			site: 'Wikimedia Commons',
			url: 'https://commons.wikimedia.org/wiki/File:BartDeWever.jpg',
			imageUrl: 'https://i.ytimg.com/vi/wAht7YUFmew/maxresdefault.jpg',
			foundDate: '1 month ago',
			status: 'confirmed',
			confidence: 91,
			tags: ['Press', 'International']
		},
		{
			id: 7,
			title: 'Premier op staatsbezoek',
			site: 'European Commission',
			url: 'https://audiovisual.ec.europa.eu/en/photo/P-076210~2F00-01',
			imageUrl: 'https://ds.static.rtbf.be/article/image/1920x1080/0/b/0/a8ef1979aeec2737ae3830ec543ed0df-1645270337.jpg',
			foundDate: '2 months ago',
			status: 'confirmed',
			confidence: 95,
			tags: ['Press', 'International']
		},
		{
			id: 8,
			title: 'Interview met Bart De Wever',
			site: 'The Hindu',
			url: 'https://www.thehindu.com/news/international/belgian-pm-de-wever-says-trumps-tariffs-are-a-wake-up-call-for-europe/article69178496.ece',
			imageUrl: 'https://i.ytimg.com/vi/XRQMD7Y0sEI/maxresdefault.jpg',
			foundDate: '3 months ago',
			status: 'confirmed',
			confidence: 99,
			tags: ['Press', 'Interview']
		},
		{
			id: 9,
			title: 'Verkeerde persoon geïdentificeerd',
			site: 'Obscure Blog',
			url: 'https://www.blogger.com/',
			imageUrl: 'https://avatars.mds.yandex.net/i?id=d4b3ae06a876080e3f5a3a7b2b0b3accc26cf4ba-3995454-images-thumbs&n=13',
			foundDate: '2 months ago',
			status: 'rejected',
			confidence: 34,
			tags: ['Social']
		},
		{
			id: 10,
			title: 'Niet Bart De Wever',
			site: 'Facebook',
			url: 'https://www.facebook.com/BartDeWever/',
			imageUrl: 'https://i.ytimg.com/vi/4gY9aaB5qQs/maxresdefault.jpg',
			foundDate: '4 months ago',
			status: 'rejected',
			confidence: 28,
			tags: ['Social']
		}
	]);

	// Get all unique tags
	const allTags = $derived(
		[...new Set(images.flatMap(img => img.tags))].sort()
	);

	const filteredImages = $derived(() => {
		let result = images;

		// Filter by status
		if (statusFilter !== 'all') {
			result = result.filter(img => img.status === statusFilter);
		}

		// Filter by tags (AND logic - must have all selected tags)
		if (selectedTags.length > 0) {
			result = result.filter(img =>
				selectedTags.every(tag => img.tags.includes(tag))
			);
		}

		return result;
	});

	const statusCounts = $derived({
		all: images.length,
		pending: images.filter(img => img.status === 'pending').length,
		confirmed: images.filter(img => img.status === 'confirmed').length,
		rejected: images.filter(img => img.status === 'rejected').length
	});

	const currentReviewImage = $derived(
		reviewQueue[currentReviewIndex] || null
	);

	function getStatusClasses(status: Status): { bg: string; text: string; label: string } {
		switch (status) {
			case 'pending':
				return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Needs review' };
			case 'confirmed':
				return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Confirmed' };
			case 'rejected':
				return { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Not me' };
		}
	}

	function getConfidenceColor(confidence: number): string {
		if (confidence >= 90) return 'text-emerald-600';
		if (confidence >= 70) return 'text-amber-600';
		return 'text-red-500';
	}

	function updateStatus(id: number, newStatus: Status) {
		images = images.map(img =>
			img.id === id ? { ...img, status: newStatus } : img
		);
		if (selectedImage?.id === id) {
			selectedImage = { ...selectedImage, status: newStatus };
		}
	}

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function clearTagFilters() {
		selectedTags = [];
	}

	function startReview() {
		reviewQueue = images.filter(img => img.status === 'pending');
		currentReviewIndex = 0;
		isReviewing = true;
	}

	function confirmCurrentImage() {
		if (currentReviewImage) {
			updateStatus(currentReviewImage.id, 'confirmed');
			nextReviewImage();
		}
	}

	function rejectCurrentImage() {
		if (currentReviewImage) {
			updateStatus(currentReviewImage.id, 'rejected');
			nextReviewImage();
		}
	}

	function nextReviewImage() {
		const remainingPending = images.filter(img => img.status === 'pending');
		if (remainingPending.length === 0) {
			isReviewing = false;
		} else {
			reviewQueue = remainingPending;
			currentReviewIndex = 0;
		}
	}

	function closeReview() {
		isReviewing = false;
	}

	function openDetail(image: FoundImage) {
		if (isSelectionMode) {
			toggleSelection(image.id);
		} else {
			selectedImage = image;
		}
	}

	function closeDetail() {
		selectedImage = null;
	}

	// Selection functions
	function toggleSelectionMode() {
		isSelectionMode = !isSelectionMode;
		if (!isSelectionMode) {
			selectedIds = new Set();
		}
	}

	function toggleSelection(id: number) {
		const newSet = new Set(selectedIds);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		selectedIds = newSet;
	}

	function selectAll() {
		selectedIds = new Set(filteredImages().map(img => img.id));
	}

	function deselectAll() {
		selectedIds = new Set();
	}

	function bulkConfirm() {
		images = images.map(img =>
			selectedIds.has(img.id) ? { ...img, status: 'confirmed' } : img
		);
		selectedIds = new Set();
		isSelectionMode = false;
	}

	function bulkReject() {
		images = images.map(img =>
			selectedIds.has(img.id) ? { ...img, status: 'rejected' } : img
		);
		selectedIds = new Set();
		isSelectionMode = false;
	}

	// Context menu functions
	function showContextMenu(e: MouseEvent, imageId: number) {
		e.preventDefault();
		contextMenu = { x: e.clientX, y: e.clientY, imageId };
	}

	function hideContextMenu() {
		contextMenu = null;
	}

	function contextAction(action: string) {
		if (!contextMenu) return;
		const imageId = contextMenu.imageId;

		switch (action) {
			case 'confirm':
				updateStatus(imageId, 'confirmed');
				break;
			case 'reject':
				updateStatus(imageId, 'rejected');
				break;
			case 'pending':
				updateStatus(imageId, 'pending');
				break;
			case 'select':
				isSelectionMode = true;
				toggleSelection(imageId);
				break;
			case 'visit':
				const img = images.find(i => i.id === imageId);
				if (img) window.open(img.url, '_blank');
				break;
		}
		hideContextMenu();
	}
</script>

<svelte:head>
	<title>Unique Images - Facetracker</title>
</svelte:head>

<!-- Click outside to close context menu -->
<svelte:window onclick={hideContextMenu} />

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="flex items-start justify-between mb-4">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Unique Images</h1>
			<p class="mt-1 text-slate-600">Unique images of Bart De Wever found across the web</p>
		</div>
		<div class="flex items-center gap-2">
			{#if statusCounts.pending > 0}
				<button
					onclick={startReview}
					class="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
					Review {statusCounts.pending}
				</button>
			{/if}
		</div>
	</div>

	<!-- Filters -->
	<div class="flex items-center justify-between gap-4 mb-6">
		<!-- Tags -->
		<div class="flex items-center gap-2 flex-wrap flex-1">
			{#each allTags as tag}
				<button
					onclick={() => toggleTag(tag)}
					class="px-2.5 py-1 rounded-lg text-sm font-medium transition-all
						{selectedTags.includes(tag)
							? 'bg-blue-600 text-white'
							: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
				>
					{tag}
					{#if selectedTags.includes(tag)}
						<span class="ml-1">×</span>
					{/if}
				</button>
			{/each}
			{#if selectedTags.length > 0}
				<button
					onclick={clearTagFilters}
					class="text-xs text-slate-500 hover:text-slate-700 ml-1"
				>
					Clear
				</button>
			{/if}
		</div>

		<!-- Selection toggle -->
		<button
			onclick={toggleSelectionMode}
			class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0
				{isSelectionMode
					? 'bg-blue-100 text-blue-700'
					: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
		>
			<svg class="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			{isSelectionMode ? 'Cancel' : 'Select'}
		</button>
	</div>

	<!-- Selection Actions Bar -->
	{#if isSelectionMode}
		<div class="mb-4 rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<span class="text-sm font-medium text-blue-900">
					{selectedIds.size} selected
				</span>
				<button onclick={selectAll} class="text-sm text-blue-600 hover:text-blue-700 font-medium">
					Select all
				</button>
				<button onclick={deselectAll} class="text-sm text-blue-600 hover:text-blue-700 font-medium">
					Deselect all
				</button>
			</div>
			{#if selectedIds.size > 0}
				<div class="flex items-center gap-2">
					<button
						onclick={bulkConfirm}
						class="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
					>
						Confirm selected
					</button>
					<button
						onclick={bulkReject}
						class="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-600 text-white hover:bg-slate-700 transition-colors"
					>
						Reject selected
					</button>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Image Grid -->
	{#if filteredImages().length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each filteredImages() as image}
				{@const statusStyle = getStatusClasses(image.status)}
				{@const isSelected = selectedIds.has(image.id)}
				<div
					class="rounded-2xl bg-white border overflow-hidden hover:shadow-lg transition-all relative group
						{isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-200'}"
					oncontextmenu={(e) => showContextMenu(e, image.id)}
				>
					<!-- Selection checkbox -->
					{#if isSelectionMode}
						<button
							onclick={() => toggleSelection(image.id)}
							class="absolute top-2 left-2 z-10 h-6 w-6 rounded-full flex items-center justify-center transition-all
								{isSelected ? 'bg-blue-600 text-white' : 'bg-white/90 text-slate-400 hover:text-slate-600'}"
						>
							{#if isSelected}
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							{:else}
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<circle cx="12" cy="12" r="10" stroke-width="2" />
								</svg>
							{/if}
						</button>
					{/if}

					<!-- Dots menu -->
					<div class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
						<button
							onclick={(e) => { e.stopPropagation(); showContextMenu(e, image.id); }}
							class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-500 hover:text-slate-700 shadow-sm"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
							</svg>
						</button>
					</div>

					<button
						onclick={() => openDetail(image)}
						class="w-full text-left"
					>
						<div class="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
							<img
								src={image.imageUrl}
								alt={image.title}
								class="absolute inset-0 w-full h-full object-cover"
							/>
							<div class="absolute bottom-2 left-2">
								<span class="px-2.5 py-1 rounded-full text-xs font-medium {statusStyle.bg} {statusStyle.text}">
									{statusStyle.label}
								</span>
							</div>
							<div class="absolute bottom-2 right-2">
								<span class="px-2 py-1 rounded-lg text-xs font-bold bg-white/90 {getConfidenceColor(image.confidence)}">
									{image.confidence}%
								</span>
							</div>
						</div>
						<div class="p-4">
							<p class="font-medium text-slate-900 truncate">{image.title}</p>
							<p class="text-sm text-slate-500 mb-2">{image.site} · {image.foundDate}</p>
							{#if image.tags.length > 0}
								<div class="flex flex-wrap gap-1">
									{#each image.tags as tag}
										<span class="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">{tag}</span>
									{/each}
								</div>
							{/if}
						</div>
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<svg class="h-12 w-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
			<h3 class="text-lg font-medium text-slate-900 mb-1">No images</h3>
			<p class="text-slate-500">
				{#if selectedTags.length > 0}
					No images match the selected tags.
				{:else if statusFilter === 'confirmed'}
					No confirmed images yet.
				{:else if statusFilter === 'pending'}
					No images waiting for review.
				{:else if statusFilter === 'rejected'}
					No rejected images.
				{:else}
					We haven't found any images for you yet.
				{/if}
			</p>
		</div>
	{/if}
</div>

<!-- Context Menu -->
{#if contextMenu}
	{@const image = images.find(i => i.id === contextMenu.imageId)}
	<div
		class="fixed z-50 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-48"
		style="left: {contextMenu.x}px; top: {contextMenu.y}px;"
		onclick={(e) => e.stopPropagation()}
	>
		{#if image?.status === 'pending'}
			<button
				onclick={() => contextAction('confirm')}
				class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-emerald-600"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Confirm as me
			</button>
			<button
				onclick={() => contextAction('reject')}
				class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-600"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
				Not me
			</button>
		{:else}
			<button
				onclick={() => contextAction('pending')}
				class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-amber-600"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
				Mark as pending
			</button>
		{/if}
		<div class="border-t border-slate-100 my-1"></div>
		<button
			onclick={() => contextAction('select')}
			class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			Select
		</button>
		<button
			onclick={() => contextAction('visit')}
			class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
			</svg>
			Visit source
		</button>
	</div>
{/if}

<!-- Detail Panel (Slide-out) -->
{#if selectedImage}
	{@const statusStyle = getStatusClasses(selectedImage.status)}
	<div class="fixed inset-0 z-50">
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={closeDetail}
			aria-label="Close panel"
		></button>

		<div class="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
			<div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<h2 class="text-lg font-semibold text-slate-900">Image Details</h2>
					<span class="px-2.5 py-1 rounded-full text-xs font-medium {statusStyle.bg} {statusStyle.text}">
						{statusStyle.label}
					</span>
				</div>
				<button onclick={closeDetail} class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
					<svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="p-6 space-y-6">
				<div class="aspect-video rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
					<img
						src={selectedImage.imageUrl}
						alt={selectedImage.title}
						class="absolute inset-0 w-full h-full object-cover"
					/>
					<div class="absolute top-3 right-3">
						<span class="px-3 py-1.5 rounded-lg text-sm font-bold bg-white shadow-sm {getConfidenceColor(selectedImage.confidence)}">
							{selectedImage.confidence}% match
						</span>
					</div>
				</div>

				<div>
					<h3 class="text-xl font-semibold text-slate-900">{selectedImage.title}</h3>
					<p class="text-slate-500 mt-1">{selectedImage.site} · {selectedImage.foundDate}</p>
				</div>

				<!-- Tags -->
				{#if selectedImage.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each selectedImage.tags as tag}
							<span class="px-3 py-1 rounded-lg text-sm bg-slate-100 text-slate-700">{tag}</span>
						{/each}
					</div>
				{/if}

				<div class="rounded-xl bg-slate-50 p-4">
					<p class="text-sm text-slate-500 mb-1">Source URL</p>
					<p class="font-medium text-slate-900 text-sm break-all">{selectedImage.url}</p>
				</div>

				{#if selectedImage.status === 'pending'}
					<div class="space-y-3">
						<h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Is this you?</h3>
						<div class="flex gap-3">
							<button
								onclick={() => { updateStatus(selectedImage.id, 'confirmed'); closeDetail(); }}
								class="flex-1 px-4 py-3 rounded-xl font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
							>
								Yes, that's me
							</button>
							<button
								onclick={() => { updateStatus(selectedImage.id, 'rejected'); closeDetail(); }}
								class="flex-1 px-4 py-3 rounded-xl font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
							>
								No, not me
							</button>
						</div>
					</div>
				{:else}
					<div class="rounded-xl p-4 {selectedImage.status === 'confirmed' ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50 border border-slate-200'}">
						<div class="flex items-center gap-3">
							{#if selectedImage.status === 'confirmed'}
								<div class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
									<svg class="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<div>
									<p class="font-medium text-emerald-900">Confirmed as you</p>
									<p class="text-sm text-emerald-700">This image is in your collection</p>
								</div>
							{:else}
								<div class="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
									<svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</div>
								<div>
									<p class="font-medium text-slate-700">Not you</p>
									<p class="text-sm text-slate-500">This image is hidden from your collection</p>
								</div>
							{/if}
						</div>
						<button
							onclick={() => updateStatus(selectedImage.id, 'pending')}
							class="mt-3 text-sm text-slate-500 hover:text-slate-700 underline"
						>
							Change decision
						</button>
					</div>
				{/if}

				<a
					href={selectedImage.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
					Visit source
				</a>
			</div>
		</div>
	</div>
{/if}

<!-- Review Modal -->
{#if isReviewing && currentReviewImage}
	<div class="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center p-4">
		<button
			onclick={closeReview}
			class="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<div class="absolute top-4 left-4 text-white/60 text-sm">
			{images.filter(i => i.status !== 'pending').length} of {images.length} reviewed
		</div>

		<div class="w-full max-w-2xl">
			<div class="aspect-video rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative mb-6">
				<svg class="h-20 w-20 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<div class="absolute top-4 right-4">
					<span class="px-3 py-1.5 rounded-lg text-sm font-bold bg-white/90 {getConfidenceColor(currentReviewImage.confidence)}">
						{currentReviewImage.confidence}% match
					</span>
				</div>
			</div>

			<div class="text-center mb-8">
				<h2 class="text-xl font-semibold text-white mb-1">{currentReviewImage.title}</h2>
				<p class="text-white/60">{currentReviewImage.site} · {currentReviewImage.foundDate}</p>
				{#if currentReviewImage.tags.length > 0}
					<div class="flex justify-center gap-2 mt-3">
						{#each currentReviewImage.tags as tag}
							<span class="px-2 py-1 rounded text-xs bg-white/10 text-white/80">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>

			<p class="text-center text-white/80 text-lg mb-6">Is this you?</p>

			<div class="flex gap-4 justify-center">
				<button
					onclick={rejectCurrentImage}
					class="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
					No, not me
				</button>
				<button
					onclick={confirmCurrentImage}
					class="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Yes, that's me
				</button>
			</div>

			<p class="text-center text-white/40 text-sm mt-6">
				{statusCounts.pending} images remaining
			</p>
		</div>
	</div>
{/if}
