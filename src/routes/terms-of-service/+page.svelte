<script lang="ts">
	import PublicNav from '$lib/components/PublicNav.svelte';
</script>

<svelte:head>
	<title>Terms of Service - Facetracker</title>
</svelte:head>

<style>
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
</style>

<div class="min-h-screen bg-white">
	<PublicNav />

	<!-- Terms Section -->
	<section class="relative overflow-hidden">
		<!-- Animated background blobs -->
		<div class="blob top-20 left-20 w-72 h-72 bg-blue-400" style="animation-delay: 0s;"></div>
		<div class="blob top-40 right-20 w-96 h-96 bg-purple-400" style="animation-delay: 2s;"></div>
		<div class="blob bottom-20 left-1/3 w-80 h-80 bg-cyan-400" style="animation-delay: 4s;"></div>

		<div class="relative mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
					Terms of <span class="gradient-text">Service</span>
				</h1>
				<p class="mt-6 text-lg text-gray-600">
					Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
				</p>
			</div>

			<div class="prose prose-lg max-w-none">
				<div class="p-12 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl shadow-blue-500/10">
					<div class="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mb-8">
						<h2 class="text-2xl font-bold text-yellow-900 mb-4">📝 Content Needed</h2>
						<p class="text-yellow-800 text-lg leading-relaxed">
							<strong>Ywein needs to write the Terms of Service.</strong>
						</p>
						<p class="text-yellow-700 mt-4">
							This page is a placeholder. Please draft comprehensive terms of service that cover:
						</p>
						<ul class="text-yellow-700 mt-4 space-y-2 list-disc list-inside">
							<li>Service description and acceptable use</li>
							<li>User responsibilities and account requirements</li>
							<li>Identity verification requirements</li>
							<li>Privacy and data handling</li>
							<li>Intellectual property rights</li>
							<li>Limitation of liability</li>
							<li>Termination conditions</li>
							<li>Governing law and dispute resolution</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
