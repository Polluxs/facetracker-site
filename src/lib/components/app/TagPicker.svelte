<script lang="ts">
	interface Props {
		selectedTags: string[];
		allTags: string[];
		onUpdate: (tags: string[]) => void;
		onClose: () => void;
	}

	let { selectedTags, allTags, onUpdate, onClose }: Props = $props();

	let searchQuery = $state('');
	let localSelected = $state<string[]>([...selectedTags]);

	const filteredTags = $derived(() => {
		if (!searchQuery.trim()) return allTags;
		const query = searchQuery.toLowerCase();
		return allTags.filter(tag => tag.toLowerCase().includes(query));
	});

	const canCreateNew = $derived(() => {
		if (!searchQuery.trim()) return false;
		const query = searchQuery.trim().toLowerCase();
		return !allTags.some(tag => tag.toLowerCase() === query);
	});

	function toggleTag(tag: string) {
		if (localSelected.includes(tag)) {
			localSelected = localSelected.filter(t => t !== tag);
		} else {
			localSelected = [...localSelected, tag];
		}
	}

	function createAndAddTag() {
		const newTag = searchQuery.trim();
		if (newTag && !localSelected.includes(newTag)) {
			localSelected = [...localSelected, newTag];
		}
		searchQuery = '';
	}

	function handleSave() {
		onUpdate(localSelected);
		onClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && canCreateNew()) {
			e.preventDefault();
			createAndAddTag();
		} else if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<div class="fixed inset-0 z-50">
	<!-- Backdrop -->
	<button
		class="absolute inset-0 bg-black/50 backdrop-blur-sm"
		onclick={onClose}
		aria-label="Close"
	></button>

	<!-- Modal -->
	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
		<!-- Header -->
		<div class="px-6 py-4 border-b border-slate-200">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold text-slate-900">Add Tags</h2>
				<button onclick={onClose} class="p-1 rounded-lg hover:bg-slate-100 transition-colors">
					<svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Search input -->
		<div class="px-6 py-4 border-b border-slate-100">
			<div class="relative">
				<svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="text"
					bind:value={searchQuery}
					onkeydown={handleKeydown}
					placeholder="Search or create tag..."
					class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
				/>
			</div>
		</div>

		<!-- Selected tags -->
		{#if localSelected.length > 0}
			<div class="px-6 py-3 border-b border-slate-100 bg-slate-50">
				<p class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Selected</p>
				<div class="flex flex-wrap gap-2">
					{#each localSelected as tag}
						<button
							onclick={() => toggleTag(tag)}
							class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
						>
							{tag}
							<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Tag list -->
		<div class="px-6 py-4 max-h-64 overflow-y-auto">
			{#if canCreateNew()}
				<button
					onclick={createAndAddTag}
					class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors mb-3"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					<span class="font-medium">Create "{searchQuery.trim()}"</span>
				</button>
			{/if}

			{#if filteredTags().length > 0}
				<p class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
					{searchQuery ? 'Matching tags' : 'All tags'}
				</p>
				<div class="space-y-1">
					{#each filteredTags() as tag}
						{@const isSelected = localSelected.includes(tag)}
						<button
							onclick={() => toggleTag(tag)}
							class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left transition-colors
								{isSelected
									? 'bg-blue-50 text-blue-700'
									: 'hover:bg-slate-50 text-slate-700'}"
						>
							<div class="flex items-center gap-3">
								<svg class="h-4 w-4 {isSelected ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
								</svg>
								<span class="font-medium">{tag}</span>
							</div>
							{#if isSelected}
								<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							{/if}
						</button>
					{/each}
				</div>
			{:else if searchQuery && !canCreateNew()}
				<p class="text-center text-slate-500 py-4">No matching tags</p>
			{:else if allTags.length === 0}
				<p class="text-center text-slate-500 py-4">No tags yet. Type to create one.</p>
			{/if}
		</div>

		<!-- Footer -->
		<div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
			<button
				onclick={onClose}
				class="px-4 py-2 rounded-xl text-slate-700 font-medium hover:bg-slate-200 transition-colors"
			>
				Cancel
			</button>
			<button
				onclick={handleSave}
				class="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
			>
				Save Tags
			</button>
		</div>
	</div>
</div>
