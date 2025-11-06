<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
				Email Verification
			</h2>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title class="text-center">
					{#if data.status === 'success'}
						✅ Verification Successful!
					{:else}
						❌ Verification Failed
					{/if}
				</Card.Title>
			</Card.Header>

			<Card.Content class="text-center">
				<div class="space-y-4">
					<p class="text-gray-600">{data.message}</p>

					{#if data.status === 'success'}
						<div class="rounded-md bg-green-50 p-4">
							<p class="text-sm text-green-800">
								🎉 Welcome to Factory! You can now sign in to your account.
							</p>
						</div>
						<Button onclick={() => goto('/auth/login')} class="w-full">
							Continue to Login
						</Button>
					{:else}
						<div class="space-y-3">
							<Button onclick={() => goto('/auth/login')} class="w-full">
								Back to Login
							</Button>
						</div>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>