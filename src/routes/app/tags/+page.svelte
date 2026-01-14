<script lang="ts">
	interface Tag {
		id: string;
		name: string;
		color: string;
		count: number;
		isDefault: boolean;
	}

	let isCreating = $state(false);
	let newTagName = $state('');
	let newTagColor = $state('#8b5cf6');

	// Mock data
	let tags = $state<Tag[]>([
		{ id: '1', name: 'Professional', color: '#3b82f6', count: 45, isDefault: true },
		{ id: '2', name: 'Personal', color: '#8b5cf6', count: 23, isDefault: true },
		{ id: '3', name: 'Press', color: '#06b6d4', count: 18, isDefault: true },
		{ id: '4', name: 'Social Media', color: '#ec4899', count: 67, isDefault: true },
		{ id: '5', name: 'Review Later', color: '#f59e0b', count: 12, isDefault: true },
		{ id: '6', name: 'Work Events', color: '#10b981', count: 8, isDefault: false },
		{ id: '7', name: 'Family', color: '#ef4444', count: 5, isDefault: false }
	]);

	const colors = [
		'#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b',
		'#10b981', '#ef4444', '#6366f1', '#14b8a6', '#f97316'
	];

	function createTag() {
		if (!newTagName.trim()) return;

		const newTag: Tag = {
			id: `custom-${Date.now()}`,
			name: newTagName.trim(),
			color: newTagColor,
			count: 0,
			isDefault: false
		};

		tags = [...tags, newTag];
		newTagName = '';
		newTagColor = '#8b5cf6';
		isCreating = false;
	}

	function deleteTag(id: string) {
		tags = tags.filter(t => t.id !== id);
	}
</script>

<svelte:head>
	<title>Tags - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Tags</h1>
			<p class="mt-1 text-slate-600">Organize your found images with custom tags</p>
		</div>
		{#if !isCreating}
			<button
				onclick={() => isCreating = true}
				class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Create Tag
			</button>
		{/if}
	</div>

	<!-- Create Tag Form -->
	{#if isCreating}
		<div class="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 mb-8">
			<h2 class="text-lg font-semibold text-slate-900 mb-4">Create New Tag</h2>
			<div class="flex flex-col sm:flex-row gap-4">
				<div class="flex-1">
					<label for="tagName" class="block text-sm font-medium text-slate-700 mb-1">Tag Name</label>
					<input
						id="tagName"
						type="text"
						bind:value={newTagName}
						placeholder="e.g., Conferences, Interviews"
						class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 mb-1">Color</label>
					<div class="flex gap-2">
						{#each colors as color}
							<button
								onclick={() => newTagColor = color}
								class="h-10 w-10 rounded-lg transition-all {newTagColor === color ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'hover:scale-105'}"
								style="background-color: {color}"
								aria-label="Select color {color}"
							></button>
						{/each}
					</div>
				</div>
			</div>
			<div class="flex gap-3 mt-6">
				<button
					onclick={createTag}
					disabled={!newTagName.trim()}
					class="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Create Tag
				</button>
				<button
					onclick={() => { isCreating = false; newTagName = ''; }}
					class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
				>
					Cancel
				</button>
			</div>
		</div>
	{/if}

	<!-- Default Tags -->
	<div class="mb-8">
		<h2 class="text-lg font-semibold text-slate-900 mb-4">Default Tags</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each tags.filter(t => t.isDefault) as tag}
				<div class="rounded-xl bg-white border border-slate-200 p-4 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-lg flex items-center justify-center" style="background-color: {tag.color}20">
							<div class="h-4 w-4 rounded-full" style="background-color: {tag.color}"></div>
						</div>
						<div>
							<p class="font-medium text-slate-900">{tag.name}</p>
							<p class="text-sm text-slate-500">{tag.count} images</p>
						</div>
					</div>
					<span class="px-2 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-500">Default</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Custom Tags -->
	<div>
		<h2 class="text-lg font-semibold text-slate-900 mb-4">Custom Tags</h2>
		{#if tags.filter(t => !t.isDefault).length === 0}
			<div class="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-8 text-center">
				<svg class="h-12 w-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
				</svg>
				<p class="text-slate-600 mb-2">No custom tags yet</p>
				<p class="text-sm text-slate-500">Create your first custom tag to organize your images</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each tags.filter(t => !t.isDefault) as tag}
					<div class="rounded-xl bg-white border border-slate-200 p-4 flex items-center justify-between group">
						<div class="flex items-center gap-3">
							<div class="h-10 w-10 rounded-lg flex items-center justify-center" style="background-color: {tag.color}20">
								<div class="h-4 w-4 rounded-full" style="background-color: {tag.color}"></div>
							</div>
							<div>
								<p class="font-medium text-slate-900">{tag.name}</p>
								<p class="text-sm text-slate-500">{tag.count} images</p>
							</div>
						</div>
						<button
							onclick={() => deleteTag(tag.id)}
							class="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
							aria-label="Delete tag"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
