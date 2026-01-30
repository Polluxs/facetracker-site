<script lang="ts">
	import Topbar from '$lib/components/app/Topbar.svelte';
</script>

<div class="min-h-screen bg-white">
	<Topbar />
	<main>
		<slot />
	</main>
</div>
