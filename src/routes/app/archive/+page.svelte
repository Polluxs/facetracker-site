<script lang="ts">
	type ArchiveStatus = 'saved' | 'processing' | 'failed';

	interface ArchivedPage {
		id: number;
		site: string;
		url: string;
		archivedOn: string;
		waybackUrl: string;
		status: ArchiveStatus;
	}

	let urlInput = $state('');
	let archiveToWayback = $state(true);
	let isSubmitting = $state(false);

	// Mock data
	const archivedPages: ArchivedPage[] = [
		{ id: 1, site: 'example-blog.com', url: 'https://example-blog.com/article/123', archivedOn: 'Jan 14, 2026', waybackUrl: 'https://web.archive.org/web/20260114/example-blog.com/article/123', status: 'saved' },
		{ id: 2, site: 'news-site.org', url: 'https://news-site.org/story/456', archivedOn: 'Jan 12, 2026', waybackUrl: 'https://web.archive.org/web/20260112/news-site.org/story/456', status: 'saved' },
		{ id: 3, site: 'photo-sharing.net', url: 'https://photo-sharing.net/gallery/789', archivedOn: 'Jan 10, 2026', waybackUrl: '', status: 'processing' },
		{ id: 4, site: 'social-network.io', url: 'https://social-network.io/post/abc', archivedOn: 'Jan 8, 2026', waybackUrl: 'https://web.archive.org/web/20260108/social-network.io/post/abc', status: 'saved' },
		{ id: 5, site: 'company-blog.com', url: 'https://company-blog.com/team/def', archivedOn: 'Jan 5, 2026', waybackUrl: '', status: 'failed' }
	];

	function getStatusClasses(status: ArchiveStatus): string {
		switch (status) {
			case 'saved':
				return 'bg-emerald-100 text-emerald-700';
			case 'processing':
				return 'bg-amber-100 text-amber-700';
			case 'failed':
				return 'bg-red-100 text-red-700';
		}
	}

	function handleSubmit() {
		if (!urlInput.trim()) return;
		isSubmitting = true;
		// Simulate submission
		setTimeout(() => {
			isSubmitting = false;
			urlInput = '';
		}, 1000);
	}
</script>

<svelte:head>
	<title>Archive - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Archive</h1>
		<p class="mt-1 text-slate-600">Preserve evidence of where you appear online</p>
	</div>

	<!-- Submit URL Section -->
	<div class="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 p-6 mb-8">
		<h2 class="text-lg font-semibold text-slate-900 mb-2">Submit a URL</h2>
		<p class="text-sm text-slate-600 mb-4">Found yourself somewhere we haven't scanned yet? Submit the URL to add it to your records.</p>

		<div class="space-y-4">
			<div>
				<label for="url" class="block text-sm font-medium text-slate-700 mb-1">Page URL</label>
				<input
					id="url"
					type="url"
					bind:value={urlInput}
					placeholder="https://example.com/page-with-your-image"
					class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			<label class="flex items-center gap-3 cursor-pointer">
				<input
					type="checkbox"
					bind:checked={archiveToWayback}
					class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
				/>
				<span class="text-sm text-slate-700">Archive this page to Wayback Machine</span>
			</label>

			<button
				onclick={handleSubmit}
				disabled={isSubmitting || !urlInput.trim()}
				class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{#if isSubmitting}
					<span class="flex items-center gap-2">
						<svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Submitting...
					</span>
				{:else}
					Submit URL
				{/if}
			</button>
		</div>

		<div class="mt-4 p-4 rounded-xl bg-white/50">
			<p class="text-sm text-slate-600">
				<strong>What happens next:</strong>
			</p>
			<ol class="mt-2 text-sm text-slate-500 list-decimal list-inside space-y-1">
				<li>We'll verify the URL is accessible</li>
				<li>The image will appear in your "Pending Review" section</li>
				<li>You can add tags and notes once verified</li>
			</ol>
		</div>
	</div>

	<!-- Archived Pages -->
	<div class="rounded-2xl bg-white border border-slate-200 shadow-sm">
		<div class="px-6 py-4 border-b border-slate-100">
			<h2 class="text-lg font-semibold text-slate-900">Archived Pages</h2>
			<p class="text-sm text-slate-500">Pages saved to the Wayback Machine</p>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-slate-50 border-b border-slate-200">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Site</th>
						<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Archived On</th>
						<th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
						<th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					{#each archivedPages as page}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="px-6 py-4">
								<p class="font-medium text-slate-900">{page.site}</p>
								<p class="text-sm text-slate-500 truncate max-w-xs">{page.url}</p>
							</td>
							<td class="px-6 py-4 text-sm text-slate-600">{page.archivedOn}</td>
							<td class="px-6 py-4">
								<span class="px-2.5 py-1 rounded-full text-xs font-medium {getStatusClasses(page.status)}">
									{page.status}
								</span>
							</td>
							<td class="px-6 py-4 text-right">
								{#if page.status === 'saved'}
									<a
										href={page.waybackUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:text-blue-700 text-sm font-medium"
									>
										View Snapshot
									</a>
								{:else if page.status === 'processing'}
									<span class="text-sm text-slate-400">Processing...</span>
								{:else}
									<button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
										Retry
									</button>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
