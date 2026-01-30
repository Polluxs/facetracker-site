<script lang="ts">
	interface ReferencePhoto {
		id: number;
		uploadedOn: string;
		isPrimary: boolean;
	}

	let isDragging = $state(false);

	// Mock data
	let photos = $state<ReferencePhoto[]>([
		{ id: 1, uploadedOn: 'Jan 10, 2026', isPrimary: true },
		{ id: 2, uploadedOn: 'Jan 8, 2026', isPrimary: false },
		{ id: 3, uploadedOn: 'Jan 5, 2026', isPrimary: false }
	]);

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		// Handle file upload logic here
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function setPrimary(id: number) {
		photos = photos.map(p => ({ ...p, isPrimary: p.id === id }));
	}

	function deletePhoto(id: number) {
		photos = photos.filter(p => p.id !== id);
	}
</script>

<svelte:head>
	<title>Reference Photos - Facetracker</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Reference Photos</h1>
		<p class="mt-1 text-slate-600">The photos we use to find you online</p>
	</div>

	<!-- Upload Section -->
	<div
		class="rounded-2xl border-2 border-dashed p-8 mb-8 text-center transition-all {isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}"
		ondrop={handleDrop}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
	>
		<div class="flex flex-col items-center">
			<div class="h-16 w-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4">
				<svg class="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-slate-900 mb-1">Upload Reference Photos</h3>
			<p class="text-sm text-slate-500 mb-4">Drag and drop photos here, or click to browse</p>
			<button class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
				Choose Photos
			</button>
		</div>
	</div>

	<!-- Guidelines -->
	<div class="rounded-2xl bg-blue-50 border border-blue-100 p-6 mb-8">
		<h3 class="font-semibold text-slate-900 mb-3 flex items-center gap-2">
			<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			Photo Guidelines
		</h3>
		<ul class="space-y-2 text-sm text-slate-600">
			<li class="flex items-start gap-2">
				<svg class="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Upload clear, front-facing photos
			</li>
			<li class="flex items-start gap-2">
				<svg class="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Include photos from different angles for better matching
			</li>
			<li class="flex items-start gap-2">
				<svg class="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Professional headshots work best
			</li>
			<li class="flex items-start gap-2">
				<svg class="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Minimum 3 photos recommended for accuracy
			</li>
		</ul>
	</div>

	<!-- Your Photos -->
	<div class="rounded-2xl bg-white border border-slate-200 shadow-sm">
		<div class="px-6 py-4 border-b border-slate-100">
			<h2 class="text-lg font-semibold text-slate-900">Your Photos</h2>
			<p class="text-sm text-slate-500">{photos.length} reference photo{photos.length !== 1 ? 's' : ''} uploaded</p>
		</div>

		{#if photos.length === 0}
			<div class="p-8 text-center">
				<p class="text-slate-500">No reference photos uploaded yet</p>
			</div>
		{:else}
			<div class="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each photos as photo}
					<div class="relative group rounded-xl overflow-hidden border border-slate-200">
						<div class="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
							<svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>

						<!-- Primary Badge -->
						{#if photo.isPrimary}
							<div class="absolute top-2 left-2">
								<span class="px-2 py-1 rounded-lg text-xs font-medium bg-blue-600 text-white">Primary</span>
							</div>
						{/if}

						<!-- Hover Actions -->
						<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
							{#if !photo.isPrimary}
								<button
									onclick={() => setPrimary(photo.id)}
									class="p-2 rounded-lg bg-white text-slate-700 hover:bg-slate-100 transition-colors"
									aria-label="Set as primary"
								>
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
									</svg>
								</button>
							{/if}
							<button
								onclick={() => deletePhoto(photo.id)}
								class="p-2 rounded-lg bg-white text-red-600 hover:bg-red-50 transition-colors"
								aria-label="Delete photo"
							>
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>

						<!-- Footer -->
						<div class="p-3 bg-white">
							<p class="text-xs text-slate-500">Uploaded {photo.uploadedOn}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Privacy Note -->
	<div class="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
		<div class="flex items-start gap-3">
			<svg class="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
			</svg>
			<div>
				<p class="font-medium text-emerald-800">Your privacy is protected</p>
				<p class="text-sm text-emerald-700 mt-1">Your reference photos are stored securely and never shared. They are only used to match against images found online.</p>
			</div>
		</div>
	</div>
</div>
