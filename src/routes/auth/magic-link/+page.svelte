<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let status: 'loading' | 'success' | 'error' = 'loading';
	let message = '';

	onMount(async () => {
		const token = $page.url.searchParams.get('token');

		if (!token) {
			status = 'error';
			message = 'Invalid magic link - missing token';
			return;
		}

		try {
			const response = await fetch('/api/auth/verify-magic-link', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token
				})
			});

			const result = await response.json();

			if (!response.ok) {
				status = 'error';
				message = result.error || 'Failed to verify magic link';
			} else {
				status = 'success';
				message = 'Successfully signed in! Redirecting...';

				// Redirect to app after a short delay
				setTimeout(() => {
					goto('/app');
				}, 2000);
			}
		} catch (err) {
			console.error('Magic link verification error:', err);
			status = 'error';
			message = 'An unexpected error occurred';
		}
	});
</script>

<svelte:head>
	<title>Signing you in...</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-md text-center">
		{#if status === 'loading'}
			<div class="space-y-4">
				<div class="mx-auto h-12 w-12 animate-spin">
					<svg
						class="h-full w-full text-indigo-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-gray-900">Signing you in...</h2>
				<p class="text-gray-600">Please wait while we verify your magic link</p>
			</div>
		{:else if status === 'success'}
			<div class="space-y-4">
				<div class="mx-auto h-12 w-12 text-green-600">
					<svg
						class="h-full w-full"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-gray-900">Welcome back!</h2>
				<p class="text-gray-600">{message}</p>
			</div>
		{:else}
			<div class="space-y-4">
				<div class="mx-auto h-12 w-12 text-red-600">
					<svg
						class="h-full w-full"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-gray-900">Sign in failed</h2>
				<p class="text-gray-600">{message}</p>
				<a
					href="/auth/login"
					class="inline-block rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
				>
					Try again
				</a>
			</div>
		{/if}
	</div>
</div>