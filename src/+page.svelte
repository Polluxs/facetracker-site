<script lang="ts">
	import PublicNav from '$lib/components/PublicNav.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Facetracker - The Ethical Way to Track Yourself Online</title>
	<meta name="description"
				content="Europe's compliant alternative for tracking where your images appear online. Ethical, privacy-first face tracking with legal takedown assistance." />
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

    .delay-300 {
        animation-delay: 0.3s;
        opacity: 0;
    }

    .delay-400 {
        animation-delay: 0.4s;
        opacity: 0;
    }

    .gradient-text {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hover-lift {
        transition: all 0.3s ease;
    }

    .hover-lift:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.25);
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
				<h1
					class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl animate-fade-in-up"
					style="line-height: 1.1;">
					Track <span class="gradient-text">Yourself</span> Online,<br />The Ethical Way
				</h1>
				<p
					class="mt-8 text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-100">
					Discover where your images appear across the web. Europe-based, privacy-first, and fully
					compliant. Take control of your digital presence.
				</p>
				<div class="mt-12 flex items-center justify-center gap-x-6 animate-fade-in-up delay-200">
					<Button href="/auth/onboarding" size="lg"
									class="text-lg px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
						Start Verification
					</Button>
					<Button variant="outline" size="lg" href="#how-it-works"
									class="text-lg px-8 py-6 rounded-2xl border-2">
						How It Works
					</Button>
				</div>
				<p class="mt-6 text-sm text-gray-500 animate-fade-in-up delay-300">
					🔒 Identity verification required for ethical use
				</p>
			</div>

			<!-- Trust Indicators -->
			<div class="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3 animate-fade-in delay-400">
				<div
					class="text-center px-6 py-10 rounded-2xl bg-gradient-to-br from-blue-50/30 to-cyan-50/20 border border-blue-100/40 transition-all duration-300 hover:border-blue-200 hover:from-blue-50/50 hover:to-cyan-50/40 hover:shadow-md">
					<div
						class="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
						</svg>
					</div>
					<h3 class="mt-5 text-lg font-semibold text-gray-900">Europe-Based</h3>
					<p class="mt-2 text-sm text-gray-600 leading-relaxed">Fully compliant with European
						privacy regulations</p>
				</div>
				<div
					class="text-center px-6 py-10 rounded-2xl bg-gradient-to-br from-purple-50/30 to-pink-50/20 border border-purple-100/40 transition-all duration-300 hover:border-purple-200 hover:from-purple-50/50 hover:to-pink-50/40 hover:shadow-md">
					<div
						class="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
						</svg>
					</div>
					<h3 class="mt-5 text-lg font-semibold text-gray-900">Verified Users Only</h3>
					<p class="mt-2 text-sm text-gray-600 leading-relaxed">ID verification ensures ethical,
						consensual tracking</p>
				</div>
				<div
					class="text-center px-6 py-10 rounded-2xl bg-gradient-to-br from-cyan-50/30 to-blue-50/20 border border-cyan-100/40 transition-all duration-300 hover:border-cyan-200 hover:from-cyan-50/50 hover:to-blue-50/40 hover:shadow-md">
					<div
						class="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
						</svg>
					</div>
					<h3 class="mt-5 text-lg font-semibold text-gray-900">Privacy-First</h3>
					<p class="mt-2 text-sm text-gray-600 leading-relaxed">Only your chosen photos stored, no
						biometric data</p>
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works Section -->
	<section id="how-it-works" class="py-32 bg-gradient-to-b from-white to-blue-50/30">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h2 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
					How It <span class="gradient-text">Works</span>
				</h2>
				<p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
					Simple, secure, and transparent
				</p>
			</div>

			<div class="mt-24 grid grid-cols-1 gap-16 md:grid-cols-3">
				<div class="text-center relative">
					<div
						class="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-3xl font-bold shadow-2xl shadow-blue-500/40">
						1
					</div>
					<div class="mt-8 space-y-4">
						<div
							class="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
							<svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor"
									 viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Verify Your Identity</h3>
						<p class="text-gray-600 leading-relaxed px-4">
							Upload a valid ID to ensure ethical use and prevent misuse
						</p>
					</div>
				</div>
				<div class="text-center relative">
					<div
						class="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl font-bold shadow-2xl shadow-purple-500/40">
						2
					</div>
					<div class="mt-8 space-y-4">
						<div
							class="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
							<svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor"
									 viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Upload Your Photos</h3>
						<p class="text-gray-600 leading-relaxed px-4">
							Provide photos of yourself for facial comparison and tracking
						</p>
					</div>
				</div>
				<div class="text-center relative">
					<div
						class="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-2xl shadow-cyan-500/40">
						3
					</div>
					<div class="mt-8 space-y-4">
						<div
							class="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
							<svg class="h-6 w-6 text-cyan-600" fill="none" stroke="currentColor"
									 viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Track & Take Action</h3>
						<p class="text-gray-600 leading-relaxed px-4">
							Monitor where your images appear and request legal takedowns
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-32 bg-white">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h2 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
					Why <span class="gradient-text">Facetracker</span>?
				</h2>
				<p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
					The ethical alternative to non-compliant services
				</p>
			</div>

			<div class="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2">
				<div
					class="group p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 hover-lift border-2 border-blue-100/50">
					<div
						class="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-6">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
						</svg>
					</div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Ethical Self-Tracking</h3>
					<p class="text-gray-600 leading-relaxed">
						Track yourself, not others. Identity verification ensures consensual use only. No
						unauthorized tracking.
					</p>
				</div>

				<div
					class="group p-10 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 hover-lift border-2 border-purple-100/50">
					<div
						class="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg mb-6">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
						</svg>
					</div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Legal Takedown Assistance</h3>
					<p class="text-gray-600 leading-relaxed">
						Request legal removal of your images from websites. We help you exercise your rights.
					</p>
				</div>

				<div
					class="group p-10 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 hover-lift border-2 border-cyan-100/50">
					<div
						class="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg mb-6">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
						</svg>
					</div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Privacy-First Design</h3>
					<p class="text-gray-600 leading-relaxed">
						Only your chosen reference photos are stored. Real-time monitoring with full
						transparency about data usage.
					</p>
				</div>

				<div
					class="group p-10 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 hover-lift border-2 border-indigo-100/50">
					<div
						class="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg mb-6">
						<svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">European Compliance</h3>
					<p class="text-gray-600 leading-relaxed">
						Based in Europe and fully compliant with GDPR and local privacy regulations. No shady
						jurisdictions.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section id="pricing" class="py-32 bg-gradient-to-b from-white to-gray-50">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h2 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
					Simple, <span class="gradient-text">Transparent</span> Pricing
				</h2>
				<p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
					Start with a free month trial. No credit card required.
				</p>
			</div>

			<div class="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
				<!-- Free Trial Card -->
				<div
					class="relative p-8 rounded-3xl bg-white border-2 border-gray-200 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
					<div class="mb-8">
						<h3 class="text-2xl font-bold text-gray-900">Free Trial</h3>
						<p class="mt-2 text-gray-600">Try Standard for free</p>
					</div>
					<div class="mb-8">
						<div class="flex items-baseline">
							<span class="text-5xl font-bold text-gray-900">€0</span>
							<span class="ml-2 text-gray-600">/month</span>
						</div>
						<p class="mt-2 text-sm text-gray-500">First month free</p>
					</div>
					<ul class="space-y-4 mb-8">
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700"><strong>5 scans</strong> per month</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Up to <strong>10k images</strong> validated</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Real-time monitoring</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Takedown requests</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Advanced analytics</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">No credit card required</span>
						</li>
					</ul>
					<Button href="/auth/onboarding"
									class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
						Start Free Trial
					</Button>
				</div>

				<!-- Standard Plan Card -->
				<div
					class="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl scale-105 transform">
					<div class="absolute -top-4 left-1/2 -translate-x-1/2">
						<span
							class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
					</div>
					<div class="mb-8">
						<h3 class="text-2xl font-bold text-gray-900">Standard</h3>
						<p class="mt-2 text-gray-600">Perfect for individuals</p>
					</div>
					<div class="mb-8">
						<div class="flex items-baseline">
							<span class="text-5xl font-bold text-gray-900">€9.99</span>
							<span class="ml-2 text-gray-600">/month</span>
						</div>
						<p class="mt-2 text-sm text-gray-500">Billed monthly</p>
					</div>
					<ul class="space-y-4 mb-8">
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700"><strong>5 scans</strong> per month</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Up to <strong>10k images</strong> validated</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Real-time monitoring</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Takedown requests</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Advanced analytics</span>
						</li>
					</ul>
					<Button href="/auth/onboarding"
									class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
						Get Started
					</Button>
				</div>

				<!-- Professional Plan Card -->
				<div
					class="relative p-8 rounded-3xl bg-white border-2 border-gray-200 transition-all duration-300 hover:border-purple-300 hover:shadow-lg">
					<div class="mb-8">
						<h3 class="text-2xl font-bold text-gray-900">Professional</h3>
						<p class="mt-2 text-gray-600">For power users</p>
					</div>
					<div class="mb-8">
						<div class="flex items-baseline">
							<span class="text-5xl font-bold text-gray-900">€99.99</span>
							<span class="ml-2 text-gray-600">/month</span>
						</div>
						<p class="mt-2 text-sm text-gray-500">Billed monthly</p>
					</div>
					<ul class="space-y-4 mb-8">
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700"><strong>Daily scans</strong></span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Up to <strong>100k images</strong> validated</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700"><strong>Legal takedown assistance</strong></span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Priority support</span>
						</li>
						<li class="flex items-start">
							<svg class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none"
									 stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-gray-700">Ywein's phone number (he'll help you)</span>
						</li>
					</ul>
					<Button href="/auth/onboarding" variant="outline" class="w-full border-2">
						Get Started
					</Button>
				</div>
			</div>

			<p class="mt-12 text-center text-sm text-gray-500">
				All plans include GDPR compliance and European data hosting
			</p>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="relative overflow-hidden">
		<!-- Gradient background -->
		<div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600"></div>
		<div class="blob top-0 left-0 w-96 h-96 bg-blue-400" style="animation-delay: 1s;"></div>
		<div class="blob bottom-0 right-0 w-80 h-80 bg-purple-400" style="animation-delay: 3s;"></div>

		<div class="relative mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
			<div class="text-center">
				<h2 class="text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style="line-height: 1.2;">
					Take Control of Your<br />Digital Presence
				</h2>
				<p class="mt-8 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
					Join the ethical alternative to privacy-invasive tracking services
				</p>
				<div class="mt-12 flex justify-center gap-4">
					<Button href="/auth/onboarding" size="lg"
									class="text-lg px-10 py-7 rounded-2xl bg-white text-blue-600 hover:bg-gray-50 shadow-2xl shadow-blue-900/30">
						Get Started
					</Button>
				</div>
				<p class="mt-8 text-sm text-blue-200">
					🇪🇺 Proudly based in Europe
				</p>
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
					<a href="/privacy-policy" class="hover:text-white transition-colors text-base">Privacy
						Policy</a>
					<a href="/terms-of-service" class="hover:text-white transition-colors text-base">Terms of
						Service</a>
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