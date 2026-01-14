<script lang="ts">
	let url = $state('');
	let isLoading = $state(false);
	let success = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true;

		// Simulate submission
		await new Promise(resolve => setTimeout(resolve, 1500));

		success = true;
		isLoading = false;
	}
</script>

<svelte:head>
	<title>Add Page - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8 max-w-2xl mx-auto">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Add a page</h1>
		<p class="mt-1 text-slate-600">Found yourself somewhere online? Add it to your collection.</p>
	</div>

	{#if success}
		<!-- Success State -->
		<div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
			<div class="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
				<svg class="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h2 class="text-xl font-semibold text-slate-900 mb-2">Page added!</h2>
			<p class="text-slate-600 mb-6">We're capturing a screenshot now. It'll appear in your collection shortly.</p>
			<div class="flex gap-3 justify-center">
				<button
					onclick={() => { success = false; url = ''; }}
					class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
				>
					Add another
				</button>
				<a
					href="/app/results"
					class="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
				>
					View collection
				</a>
			</div>
		</div>
	{:else}
		<!-- Form -->
		<form onsubmit={handleSubmit} class="space-y-6">
			<div class="rounded-2xl bg-white border border-slate-200 p-6">
				<label for="url" class="block text-sm font-medium text-slate-700 mb-2">
					Page URL
				</label>
				<input
					type="url"
					id="url"
					bind:value={url}
					placeholder="https://example.com/article-about-you"
					required
					disabled={isLoading}
					class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
				/>
				<p class="mt-2 text-sm text-slate-500">
					Paste the full URL of the page where you appear
				</p>
			</div>

			<div class="rounded-2xl bg-slate-50 border border-slate-200 p-6">
				<h3 class="font-medium text-slate-900 mb-3">What happens next?</h3>
				<ul class="space-y-2 text-sm text-slate-600">
					<li class="flex items-start gap-2">
						<svg class="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>We capture a screenshot of the page</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>The page is added to your collection</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>You can organize it with tags anytime</span>
					</li>
				</ul>
			</div>

			<button
				type="submit"
				disabled={isLoading || !url}
				class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			>
				{#if isLoading}
					<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Adding page...
				{:else}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					Add to collection
				{/if}
			</button>
		</form>
	{/if}
</div>
