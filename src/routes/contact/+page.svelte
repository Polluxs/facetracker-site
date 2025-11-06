<script lang="ts">
	import PublicNav from '$lib/components/PublicNav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	function handleSubmit(event: Event) {
		event.preventDefault();

		isSubmitting = true;

		// Fake submission - simulate API call
		setTimeout(() => {
			isSubmitting = false;
			isSubmitted = true;

			// Reset form after showing success
			setTimeout(() => {
				formData = {
					name: '',
					email: '',
					subject: '',
					message: ''
				};
				isSubmitted = false;
			}, 3000);
		}, 1000);
	}
</script>

<svelte:head>
	<title>Contact Us - Facetracker</title>
	<meta name="description" content="Get in touch with the Facetracker team. We're here to help with any questions about ethical face tracking." />
</svelte:head>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.animate-fade-in {
		animation: fadeIn 0.8s ease-out forwards;
	}

	.delay-100 {
		animation-delay: 0.1s;
		opacity: 0;
	}

	.delay-200 {
		animation-delay: 0.2s;
		opacity: 0;
	}

	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.4;
		animation: blob 7s infinite;
	}

	@keyframes blob {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes checkmark {
		0% {
			stroke-dashoffset: 100;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	.checkmark-circle {
		animation: fadeIn 0.3s ease-out forwards;
	}

	.checkmark-check {
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		animation: checkmark 0.6s ease-out forwards 0.3s;
	}
</style>

<div class="min-h-screen bg-white">
	<PublicNav />

	<!-- Hero Section -->
	<section class="relative overflow-hidden">
		<!-- Animated background blobs -->
		<div class="blob top-20 left-20 w-72 h-72 bg-blue-400" style="animation-delay: 0s;"></div>
		<div class="blob top-40 right-20 w-96 h-96 bg-purple-400" style="animation-delay: 2s;"></div>
		<div class="blob bottom-20 left-1/3 w-80 h-80 bg-cyan-400" style="animation-delay: 4s;"></div>

		<div class="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl animate-fade-in-up" style="line-height: 1.1;">
					Get in <span class="gradient-text">Touch</span>
				</h1>
				<p class="mt-8 text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-100">
					Have questions about Facetracker? We're here to help. Send us a message and we'll get back to you as soon as possible.
				</p>
			</div>
		</div>
	</section>

	<!-- Contact Form Section -->
	<section class="pt-8 pb-32 bg-gradient-to-b from-white to-blue-50/30">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<div class="relative rounded-3xl bg-white border-2 border-blue-100/50 shadow-2xl shadow-blue-500/10 p-8 sm:p-12 animate-fade-in delay-200">
				{#if isSubmitted}
					<div class="text-center py-16 animate-fade-in">
						<div class="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg checkmark-circle">
							<svg class="h-10 w-10 text-white checkmark-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
							</svg>
						</div>
						<h3 class="text-3xl font-bold text-gray-900 mb-3">Message Sent!</h3>
						<p class="text-lg text-gray-600">
							Thank you for contacting us. We'll get back to you soon.
						</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-8">
						<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
							<div class="space-y-3">
								<Label for="name" class="text-base font-semibold text-gray-900">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Your name"
									bind:value={formData.name}
									required
									disabled={isSubmitting}
									class="h-12 text-base rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500"
								/>
							</div>

							<div class="space-y-3">
								<Label for="email" class="text-base font-semibold text-gray-900">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="your@email.com"
									bind:value={formData.email}
									required
									disabled={isSubmitting}
									class="h-12 text-base rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500"
								/>
							</div>
						</div>

						<div class="space-y-3">
							<Label for="subject" class="text-base font-semibold text-gray-900">Subject</Label>
							<Input
								id="subject"
								type="text"
								placeholder="What is this about?"
								bind:value={formData.subject}
								required
								disabled={isSubmitting}
								class="h-12 text-base rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500"
							/>
						</div>

						<div class="space-y-3">
							<Label for="message" class="text-base font-semibold text-gray-900">Message</Label>
							<Textarea
								id="message"
								placeholder="Tell us more..."
								bind:value={formData.message}
								required
								disabled={isSubmitting}
								class="min-h-[200px] text-base rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
							/>
						</div>

						<div class="pt-4">
							<Button
								type="submit"
								disabled={isSubmitting}
								size="lg"
								class="w-full text-lg px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</Button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gradient-to-b from-gray-900 to-black">
		<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div class="text-center space-y-8">
				<div class="flex justify-center items-center">
					<h3 class="text-2xl font-bold gradient-text">Facetracker</h3>
				</div>
				<div class="flex flex-wrap justify-center gap-8 text-gray-400">
					<a href="/privacy-policy" class="hover:text-white transition-colors text-base">Privacy Policy</a>
					<a href="/terms-of-service" class="hover:text-white transition-colors text-base">Terms of Service</a>
					<a href="/contact" class="hover:text-white transition-colors text-base">Contact Us</a>
				</div>
				<div class="pt-8 border-t border-gray-800">
					<p class="text-sm text-gray-500">
						© 2025 Facetracker. Europe-based and privacy-first.
					</p>
				</div>
			</div>
		</div>
	</footer>
</div>
