<script lang="ts">
	import Sidebar from '$lib/components/app/Sidebar.svelte';
	import MobileNav from '$lib/components/app/MobileNav.svelte';
</script>

<div class="min-h-screen bg-slate-50">
	<!-- Desktop Sidebar -->
	<Sidebar />

	<!-- Main Content -->
	<main class="lg:pl-64 pb-20 lg:pb-0">
		<slot />
	</main>

	<!-- Mobile Bottom Navigation -->
	<MobileNav />
</div>
