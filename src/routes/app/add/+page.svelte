<script lang="ts">
	import { goto } from '$app/navigation';

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

	function close() {
		goto('/app');
	}
</script>

<svelte:head>
	<title>Add Page - Facetracker</title>
</svelte:head>

<div class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pb-4 overflow-y-auto">
	<!-- Backdrop -->
	<button
		class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
		onclick={close}
		aria-label="Close"
	></button>

	<!-- Modal -->
	<div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-modal-in">
		<!-- Close button -->
		<button
			onclick={close}
			class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors z-10"
			aria-label="Close"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<div class="p-6">
			<!-- Header -->
			<div class="mb-6">
				<h1 class="text-2xl font-bold text-slate-900">Add a page</h1>
				<p class="mt-1 text-slate-600">Found yourself somewhere online?</p>
			</div>

			{#if success}
				<!-- Success State -->
				<div class="text-center py-4">
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
							class="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
						>
							Add another
						</button>
						<button
							onclick={close}
							class="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
						>
							Done
						</button>
					</div>
				</div>
			{:else}
				<!-- Form -->
				<form onsubmit={handleSubmit} class="space-y-5">
					<div>
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
					</div>

					<div class="rounded-xl bg-slate-50 p-4">
						<p class="text-sm text-slate-600">
							We'll capture a screenshot and add it to your collection.
						</p>
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
	</div>
</div>

<style>
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.2s ease-out;
	}

	.animate-modal-in {
		animation: modal-in 0.25s ease-out;
	}
</style>
