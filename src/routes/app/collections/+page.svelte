<script lang="ts">
	interface CollectionItem {
		id: number;
		title: string;
		site: string;
		url: string;
	}

	interface Collection {
		id: number;
		name: string;
		description: string;
		websiteCount: number;
		imageCount: number;
		createdAt: string;
		color: string;
		websites: CollectionItem[];
		images: CollectionItem[];
	}

	// Demo collections for Bart De Wever
	let collections = $state<Collection[]>([
		{
			id: 1,
			name: 'N-VA Campaign 2024',
			description: 'All coverage from the 2024 federal campaign',
			websiteCount: 8,
			imageCount: 12,
			createdAt: 'December 2024',
			color: 'bg-blue-500',
			websites: [
				{ id: 1, title: 'De Wever kondigt kandidatuur aan', site: 'VRT NWS', url: 'https://vrt.be/vrtnws/nl/2024/09/01' },
				{ id: 2, title: 'N-VA presenteert verkiezingsprogramma', site: 'De Standaard', url: 'https://standaard.be/cnt/123' },
				{ id: 3, title: 'Interview: De toekomst van België', site: 'Knack', url: 'https://knack.be/nieuws/456' },
				{ id: 4, title: 'Campagne update', site: 'Het Nieuwsblad', url: 'https://nieuwsblad.be/cnt/789' }
			],
			images: [
				{ id: 1, title: 'Campagnefoto congres', site: 'N-VA.be', url: 'https://n-va.be/media/1' },
				{ id: 2, title: 'Persconferentie Antwerpen', site: 'Belga', url: 'https://belga.be/2' },
				{ id: 3, title: 'Verkiezingsaffiche', site: 'Campaign Materials', url: 'https://n-va.be/3' }
			]
		},
		{
			id: 2,
			name: 'International Press',
			description: 'Coverage in international media',
			websiteCount: 5,
			imageCount: 3,
			createdAt: 'November 2024',
			color: 'bg-purple-500',
			websites: [
				{ id: 1, title: 'Belgium PM at EU Summit', site: 'Politico', url: 'https://politico.eu/article/789' },
				{ id: 2, title: 'De Wever meets Macron', site: 'Le Monde', url: 'https://lemonde.fr/europe/abc' },
				{ id: 3, title: 'Belgian coalition talks', site: 'The Guardian', url: 'https://theguardian.com/world/belgium' }
			],
			images: [
				{ id: 1, title: 'EU Summit photo', site: 'Reuters', url: 'https://reuters.com/1' },
				{ id: 2, title: 'Press conference Brussels', site: 'AFP', url: 'https://afp.com/2' }
			]
		},
		{
			id: 3,
			name: 'Unauthorized Use',
			description: 'Content to monitor for potential takedown',
			websiteCount: 2,
			imageCount: 4,
			createdAt: 'January 2025',
			color: 'bg-red-500',
			websites: [
				{ id: 1, title: 'Misleading article', site: 'random-blog.be', url: 'https://random-blog.be/page' }
			],
			images: [
				{ id: 1, title: 'Manipulated campaign photo', site: 'Reddit', url: 'https://reddit.com/r/belgium/post123' },
				{ id: 2, title: 'Unauthorized commercial use', site: 'random-shop.be', url: 'https://random-shop.be/ad' }
			]
		}
	]);

	let showCreateModal = $state(false);
	let newCollectionName = $state('');
	let newCollectionDescription = $state('');
	let selectedCollection = $state<Collection | null>(null);
	let activeTab = $state<'websites' | 'images'>('websites');

	const colorOptions = [
		'bg-blue-500',
		'bg-purple-500',
		'bg-emerald-500',
		'bg-amber-500',
		'bg-red-500',
		'bg-pink-500',
		'bg-indigo-500',
		'bg-slate-500'
	];

	let selectedColor = $state('bg-blue-500');

	function createCollection() {
		if (!newCollectionName.trim()) return;

		const newCollection: Collection = {
			id: Date.now(),
			name: newCollectionName.trim(),
			description: newCollectionDescription.trim(),
			websiteCount: 0,
			imageCount: 0,
			createdAt: 'Just now',
			color: selectedColor,
			websites: [],
			images: []
		};

		collections = [newCollection, ...collections];
		showCreateModal = false;
		newCollectionName = '';
		newCollectionDescription = '';
		selectedColor = 'bg-blue-500';
	}

	function openCollection(collection: Collection) {
		selectedCollection = collection;
		activeTab = 'websites';
	}

	function closeCollection() {
		selectedCollection = null;
	}

	function deleteCollection(id: number) {
		collections = collections.filter(c => c.id !== id);
		if (selectedCollection?.id === id) {
			selectedCollection = null;
		}
	}
</script>

<svelte:head>
	<title>Collections - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="flex items-start justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Collections</h1>
			<p class="mt-1 text-slate-600">Organize your websites and unique images into collections</p>
		</div>
		<button
			onclick={() => showCreateModal = true}
			class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			New Collection
		</button>
	</div>

	<!-- Collections Grid -->
	{#if collections.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each collections as collection}
				<button
					onclick={() => openCollection(collection)}
					class="text-left bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all group"
				>
					<!-- Color bar -->
					<div class="h-2 {collection.color}"></div>

					<div class="p-5">
						<div class="flex items-start justify-between mb-3">
							<div class="h-10 w-10 rounded-xl {collection.color} bg-opacity-10 flex items-center justify-center">
								<svg class="h-5 w-5 {collection.color.replace('bg-', 'text-')}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
						</div>

						<h3 class="text-lg font-semibold text-slate-900 mb-1">{collection.name}</h3>
						{#if collection.description}
							<p class="text-sm text-slate-500 mb-3 line-clamp-2">{collection.description}</p>
						{/if}

						<div class="flex items-center gap-4 pt-3 border-t border-slate-100">
							<div class="flex items-center gap-1.5">
								<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<span class="text-sm text-slate-600">{collection.websiteCount} websites</span>
							</div>
							<div class="flex items-center gap-1.5">
								<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span class="text-sm text-slate-600">{collection.imageCount} unique images</span>
							</div>
						</div>

						<p class="text-xs text-slate-400 mt-3">{collection.createdAt}</p>
					</div>
				</button>
			{/each}
		</div>
	{:else}
		<div class="text-center py-16 bg-white rounded-2xl border border-slate-200">
			<div class="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
				<svg class="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-slate-900 mb-2">No collections yet</h3>
			<p class="text-slate-500 mb-6">Create your first collection to organize your websites and unique images</p>
			<button
				onclick={() => showCreateModal = true}
				class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Create Collection
			</button>
		</div>
	{/if}
</div>

<!-- Create Collection Modal -->
{#if showCreateModal}
	<div class="fixed inset-0 z-50">
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={() => showCreateModal = false}
			aria-label="Close"
		></button>

		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
			<div class="px-6 py-4 border-b border-slate-200">
				<h2 class="text-lg font-semibold text-slate-900">Create Collection</h2>
			</div>

			<div class="p-6 space-y-4">
				<!-- Name -->
				<div>
					<label for="name" class="block text-sm font-medium text-slate-700 mb-1">Name</label>
					<input
						type="text"
						id="name"
						bind:value={newCollectionName}
						placeholder="e.g., Campaign 2024"
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
					/>
				</div>

				<!-- Color -->
				<div>
					<label class="block text-sm font-medium text-slate-700 mb-2">Color</label>
					<div class="flex gap-2">
						{#each colorOptions as color}
							<button
								onclick={() => selectedColor = color}
								class="h-8 w-8 rounded-lg {color} transition-transform hover:scale-110
									{selectedColor === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''}"
								aria-label="Select {color}"
							></button>
						{/each}
					</div>
				</div>

				<!-- Description -->
				<div>
					<label for="description" class="block text-sm font-medium text-slate-700 mb-1">
						Description <span class="text-slate-400">(optional)</span>
					</label>
					<textarea
						id="description"
						bind:value={newCollectionDescription}
						placeholder="What is this collection for?"
						rows="2"
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
					></textarea>
				</div>

				<div class="rounded-xl bg-slate-50 p-4">
					<p class="text-sm text-slate-600">
						Collections can contain both websites and unique images. You can add items after creating the collection.
					</p>
				</div>
			</div>

			<div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
				<button
					onclick={() => showCreateModal = false}
					class="px-4 py-2 rounded-xl text-slate-700 font-medium hover:bg-slate-200 transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={createCollection}
					disabled={!newCollectionName.trim()}
					class="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Create Collection
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Collection Detail Panel -->
{#if selectedCollection}
	<div class="fixed inset-0 z-50">
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={closeCollection}
			aria-label="Close"
		></button>

		<div class="absolute right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl overflow-y-auto">
			<!-- Header -->
			<div class="sticky top-0 bg-white border-b border-slate-200 z-10">
				<div class="px-6 py-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="h-10 w-10 rounded-xl {selectedCollection.color} bg-opacity-20 flex items-center justify-center">
								<svg class="h-5 w-5 {selectedCollection.color.replace('bg-', 'text-')}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
							<div>
								<h2 class="text-lg font-semibold text-slate-900">{selectedCollection.name}</h2>
								{#if selectedCollection.description}
									<p class="text-sm text-slate-500">{selectedCollection.description}</p>
								{/if}
							</div>
						</div>
						<button onclick={closeCollection} class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
							<svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<!-- Tabs -->
				<div class="px-6 flex gap-1">
					<button
						onclick={() => activeTab = 'websites'}
						class="px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors
							{activeTab === 'websites'
								? 'bg-white text-blue-600 border-t border-l border-r border-slate-200'
								: 'text-slate-500 hover:text-slate-700'}"
					>
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Websites ({selectedCollection.websites.length})
						</div>
					</button>
					<button
						onclick={() => activeTab = 'images'}
						class="px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors
							{activeTab === 'images'
								? 'bg-white text-blue-600 border-t border-l border-r border-slate-200'
								: 'text-slate-500 hover:text-slate-700'}"
					>
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							Unique Images ({selectedCollection.images.length})
						</div>
					</button>
				</div>
			</div>

			<div class="p-6">
				<!-- Add items button -->
				<button
					class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors mb-6"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					Add {activeTab === 'websites' ? 'websites' : 'unique images'}
				</button>

				<!-- Items list -->
				{#if activeTab === 'websites'}
					{#if selectedCollection.websites.length > 0}
						<div class="space-y-3">
							{#each selectedCollection.websites as item}
								<div class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
									<div class="h-12 w-16 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
										<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-slate-900 truncate">{item.title}</p>
										<p class="text-sm text-slate-500">{item.site}</p>
									</div>
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										class="p-2 rounded-lg hover:bg-slate-200 transition-colors"
									>
										<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								</div>
							{/each}
						</div>
					{:else}
						<div class="text-center py-8 text-slate-500">
							<p>No websites in this collection yet</p>
						</div>
					{/if}
				{:else}
					{#if selectedCollection.images.length > 0}
						<div class="space-y-3">
							{#each selectedCollection.images as item}
								<div class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
									<div class="h-12 w-16 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
										<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-slate-900 truncate">{item.title}</p>
										<p class="text-sm text-slate-500">{item.site}</p>
									</div>
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										class="p-2 rounded-lg hover:bg-slate-200 transition-colors"
									>
										<svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								</div>
							{/each}
						</div>
					{:else}
						<div class="text-center py-8 text-slate-500">
							<p>No unique images in this collection yet</p>
						</div>
					{/if}
				{/if}
			</div>

			<!-- Footer actions -->
			<div class="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4">
				<button
					onclick={() => deleteCollection(selectedCollection.id)}
					class="w-full px-4 py-2.5 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors"
				>
					Delete Collection
				</button>
			</div>
		</div>
	</div>
{/if}
