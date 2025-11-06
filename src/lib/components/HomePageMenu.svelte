<script lang="ts">
	import { fade } from 'svelte/transition';

	// Define types for props
	export let title: string = 'Flyout Title'; // Default title
	export let items: { label: string; href: string }[] = []; // Array of links with label and href
	export let button: { label: string; href: string } | null = null; // Optional button

	// State variable for managing flyout visibility
	let open: boolean = false;

	// Function to toggle the flyout visibility
	const toggleFlyout = (state: boolean): void => {
		open = state;
	};
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="h-full justify-center"
	on:mouseover={() => toggleFlyout(true)}
	on:mouseout={() => toggleFlyout(false)}
>
	<div class="relative h-fit w-fit">
		<a href="#" class="relative text-gray-400">
			{title}
		</a>

		{#if open}
			<!-- filler between text and hover effect to keep mouseover active -->
			<div class="absolute h-10 w-full bg-transparent"></div>
			<!-- actual dropdown -->
			<div
				class="absolute left-1/2 top-12 z-10 w-64 -translate-x-1/2 transform rounded-md bg-white p-6 shadow-xl"
				transition:fade={{ duration: 300 }}
				style="transform: translateX(-50%);"
			>
				<!-- arrow -->
				<div
					class="absolute left-1/2 top-[-1.5rem] h-1 w-1 -translate-x-1/2 rotate-45 transform bg-white"
				></div>
				<div class="space-y-8">
					{#each items as { label, href }}
						<a {href} class="block text-sm hover:underline">{label}</a>
					{/each}

					{#if button}
						<button
							class="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white"
						>
							{button.label}
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
