<script lang="ts">
	import PublicNav from '$lib/components/PublicNav.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Facetracker - Your Face, Your Rules</title>
	<meta name="description" content="Watch your journey unfold. Every page that features you, every mention, every moment—collected and preserved. Your face, your rules." />
</svelte:head>

<div class="min-h-screen bg-white">
	<PublicNav />

	<!-- Hero Section -->
	<section class="relative overflow-hidden border-b border-slate-100">
		<div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50"></div>

		<div class="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<p class="text-blue-600 font-medium mb-4">Your face, your rules</p>
					<h1 class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl leading-tight">
						Own your <span class="text-blue-600">online</span> presence.
					</h1>
					<p class="mt-6 text-lg text-slate-600 leading-relaxed">
						Build your own archive of everywhere you appear online. Add pages, organize your way, look back anytime.
					</p>
					<div class="mt-10 flex flex-col sm:flex-row gap-4">
						<Button href="/auth/login" size="lg" class="text-base px-8 py-6 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg text-white">
							Start Your Story
						</Button>
						<Button variant="outline" size="lg" href="#how-it-works" class="text-base px-8 py-6 rounded-xl border-slate-300 hover:bg-slate-50">
							How It Works
						</Button>
					</div>
				</div>

				<!-- Visual: Timeline/journey feeling -->
				<div class="hidden lg:block relative">
					<div class="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-6">
						<!-- Header -->
						<div class="flex items-center justify-between mb-6">
							<div>
								<p class="text-sm text-slate-500">Your collection</p>
								<p class="text-2xl font-semibold text-slate-900">47 pages</p>
							</div>
							<button class="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-1.5">
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
								</svg>
								Add page
							</button>
						</div>

						<!-- Timeline entries with screenshot previews -->
						<div class="space-y-3">
							<div class="flex gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
								<div class="w-20 h-14 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
									<svg class="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-xs text-emerald-600 font-medium">You added</p>
									<p class="text-sm font-medium text-slate-900 mt-0.5 truncate">Featured in De Standaard</p>
									<p class="text-xs text-slate-500 mt-0.5">January 12, 2026</p>
								</div>
							</div>

							<div class="flex gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
								<div class="w-20 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
									<svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-xs text-blue-600 font-medium">We found</p>
									<p class="text-sm font-medium text-slate-900 mt-0.5 truncate">Campaign photo shared</p>
									<p class="text-xs text-slate-500 mt-0.5">Appeared on 4 sites · Dec 2025</p>
								</div>
							</div>

							<div class="flex gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
								<div class="w-20 h-14 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
									<svg class="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-xs text-emerald-600 font-medium">You added</p>
									<p class="text-sm font-medium text-slate-900 truncate">Interview · Het Nieuwsblad</p>
									<p class="text-xs text-slate-500 mt-0.5">November 2025</p>
								</div>
							</div>

							<div class="flex gap-3 p-3 rounded-xl bg-slate-50/50 opacity-60">
								<div class="w-20 h-14 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
									<svg class="h-5 w-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm text-slate-400 truncate">Your first feature</p>
									<p class="text-xs text-slate-400 mt-0.5">March 2023</p>
								</div>
							</div>
						</div>

						<div class="mt-4 pt-4 border-t border-slate-100">
							<button class="text-sm text-blue-600 font-medium hover:text-blue-700">View full collection →</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Trust Bar -->
	<section class="border-b border-slate-100 bg-slate-50">
		<div class="mx-auto max-w-6xl px-6 py-4">
			<div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-600">
				<span class="group relative cursor-help border-b border-dashed border-slate-400">
					GDPR Compliant
					<div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-10 text-center">
						We follow EU privacy law. You control your data and can delete it anytime.
					</div>
				</span>
				<span class="text-slate-300">·</span>
				<span class="group relative cursor-help border-b border-dashed border-slate-400">
					SOC 2 Infrastructure
					<div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-56 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-10 text-center">
						SOC 2 is a security standard used by banks and healthcare. Your data is protected at the highest level.
					</div>
				</span>
				<span class="text-slate-300">·</span>
				<span class="group relative cursor-help border-b border-dashed border-slate-400">
					European Hosted
					<div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-44 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-10 text-center">
						Your data stays in Europe. No transfers to the US or elsewhere.
					</div>
				</span>
			</div>
		</div>
	</section>

	<!-- The Story Section -->
	<section id="how-it-works" class="border-b border-slate-100">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<h2 class="text-3xl font-semibold text-slate-900 sm:text-4xl">
					Your collection. Your way.
				</h2>
				<p class="mt-4 text-lg text-slate-600">
					You're the curator—add what matters to you
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-6">
				<!-- You: Add pages - 4 columns -->
				<div class="relative p-8 rounded-2xl bg-slate-900 text-white md:col-span-4">
					<div class="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
						</svg>
					</div>
					<p class="text-emerald-400 text-sm font-medium mb-2">You</p>
					<h3 class="text-2xl font-semibold mb-3">Add pages yourself</h3>
					<p class="text-slate-300 leading-relaxed text-lg">
						Found an article about you? A campaign photo? A press feature? Add it in one click. You're building your own archive.
					</p>
				</div>

				<!-- We help: Find more - 2 columns -->
				<div class="relative p-6 rounded-2xl bg-white border border-slate-200 md:col-span-2">
					<div class="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
						<svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
					<p class="text-blue-600 text-sm font-medium mb-2">We help</p>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">Find more</h3>
					<p class="text-slate-600 leading-relaxed">
						We look for pages you might have missed. You review and decide what to add.
					</p>
				</div>

				<!-- Second row -->
				<div class="relative p-6 rounded-2xl bg-white border border-slate-200 md:col-span-2">
					<div class="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
						<svg class="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
					</div>
					<p class="text-slate-400 text-sm font-medium mb-2">Automatic</p>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">Screenshots saved</h3>
					<p class="text-slate-600 leading-relaxed">
						Every page gets captured exactly as it was. Your proof, preserved forever.
					</p>
				</div>

				<div class="relative p-6 rounded-2xl bg-white border border-slate-200 md:col-span-2">
					<div class="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
						<svg class="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path>
						</svg>
					</div>
					<p class="text-slate-400 text-sm font-medium mb-2">Organize</p>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">Tag & filter</h3>
					<p class="text-slate-600 leading-relaxed">
						Label pages by campaign, client, or category. Find anything instantly.
					</p>
				</div>

				<div class="relative p-6 rounded-2xl bg-white border border-slate-200 md:col-span-2">
					<div class="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
						<svg class="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<p class="text-slate-400 text-sm font-medium mb-2">Timeline</p>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">Look back anytime</h3>
					<p class="text-slate-600 leading-relaxed">
						See your journey unfold. From your first feature to your latest press.
					</p>
				</div>
			</div>

			<!-- Add your own callout -->
			<div class="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center">
				<p class="text-blue-900 font-medium">Found yourself somewhere online?</p>
				<p class="text-blue-700 text-sm mt-1">Add it to your collection in one click. No waiting for us to find it.</p>
			</div>
		</div>
	</section>

	<!-- What You Get Section -->
	<section class="border-b border-slate-100 bg-slate-50">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
				<div>
					<h2 class="text-3xl font-semibold text-slate-900 sm:text-4xl">
						Look back anytime
					</h2>
					<p class="mt-4 text-lg text-slate-600 leading-relaxed">
						That interview from 2021. The campaign that launched your career. The article you forgot about. Your story, always there when you want to revisit it.
					</p>

					<div class="mt-8 space-y-4">
						<div class="flex gap-4">
							<div class="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
								<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-slate-900">Watch your journey grow</h3>
								<p class="mt-1 text-slate-600">From your first feature to your latest. See how far you've come.</p>
							</div>
						</div>

						<div class="flex gap-4">
							<div class="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
								<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-slate-900">See where photos spread</h3>
								<p class="mt-1 text-slate-600">Curious where an image ended up? Find everywhere it's been shared.</p>
							</div>
						</div>

						<div class="flex gap-4">
							<div class="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
								<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-slate-900">See pages as they were</h3>
								<p class="mt-1 text-slate-600">Every page you add is captured as a screenshot. Hover and see exactly how it looked.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
					<div class="flex items-center gap-3 mb-6">
						<div class="h-10 w-10 rounded-full bg-slate-200"></div>
						<div>
							<p class="font-medium text-slate-900">Your Story</p>
							<p class="text-sm text-slate-500">2023 – Present</p>
						</div>
					</div>

					<div class="grid grid-cols-3 gap-4 mb-6">
						<div class="text-center p-4 rounded-xl bg-slate-50">
							<p class="text-2xl font-semibold text-slate-900">47</p>
							<p class="text-xs text-slate-500 mt-1">Total pages</p>
						</div>
						<div class="text-center p-4 rounded-xl bg-slate-50">
							<p class="text-2xl font-semibold text-slate-900">12</p>
							<p class="text-xs text-slate-500 mt-1">This year</p>
						</div>
						<div class="text-center p-4 rounded-xl bg-blue-50">
							<p class="text-2xl font-semibold text-blue-600">+5</p>
							<p class="text-xs text-blue-600 mt-1">This month</p>
						</div>
					</div>

					<div class="space-y-3">
						<p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Recent moments</p>
						<div class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
							<div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
								<span class="text-blue-600 text-xs font-medium">NEW</span>
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium text-slate-900 truncate">De Standaard feature</p>
								<p class="text-xs text-slate-500">2 days ago</p>
							</div>
						</div>
						<div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
							<div class="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
								<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium text-slate-900 truncate">LinkedIn campaign</p>
								<p class="text-xs text-slate-500">Last week · 4 shares</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Protection Section (subtle, not the main pitch) -->
	<section class="border-b border-slate-100">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="max-w-3xl mx-auto">
				<h2 class="text-3xl font-semibold text-slate-900 sm:text-4xl text-center">
					And when something doesn't belong?
				</h2>
				<p class="mt-4 text-lg text-slate-600 text-center">
					Get it removed. We'll help you send the right letter.
				</p>

				<div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="p-6 rounded-2xl bg-slate-900 text-white">
						<p class="text-red-400 text-sm font-medium mb-2">Takedown assistance</p>
						<h3 class="text-xl font-semibold mb-3">We handle it for you</h3>
						<p class="text-slate-300 leading-relaxed">
							Our trained legal team sends takedown requests on your behalf. DMCA notices, GDPR requests, removal letters—professionally handled.
						</p>
					</div>
					<div class="p-6 rounded-2xl bg-white border border-slate-200">
						<p class="text-slate-400 text-sm font-medium mb-3">Self-service</p>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">Or do it yourself</h3>
						<p class="text-slate-600 leading-relaxed">
							Generate your own takedown letters with our templates. Pre-filled with your evidence, ready to send.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Who It's For Section -->
	<section class="border-b border-slate-100 bg-slate-50">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<h2 class="text-3xl font-semibold text-slate-900 sm:text-4xl">
					For people with a story to track
				</h2>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="bg-white rounded-2xl p-8 border border-slate-200">
					<h3 class="text-lg font-semibold text-slate-900 mb-2">Models & creators</h3>
					<p class="text-slate-600 leading-relaxed">
						See where your photos end up. Track campaigns, press features, and how your images spread across the web.
					</p>
				</div>

				<div class="bg-white rounded-2xl p-8 border border-slate-200">
					<h3 class="text-lg font-semibold text-slate-900 mb-2">Public figures</h3>
					<p class="text-slate-600 leading-relaxed">
						Athletes, executives, personalities—watch your coverage grow and keep a record of your public presence.
					</p>
				</div>

				<div class="bg-white rounded-2xl p-8 border border-slate-200">
					<h3 class="text-lg font-semibold text-slate-900 mb-2">Agencies & managers</h3>
					<p class="text-slate-600 leading-relaxed">
						Track your clients' presence. Document coverage for portfolios, sponsors, and reporting.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Coming Soon Section -->
	<section class="border-b border-slate-100">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="text-center max-w-2xl mx-auto mb-12">
				<p class="text-sm font-medium text-blue-600 mb-2">Coming soon</p>
				<h2 class="text-3xl font-semibold text-slate-900 sm:text-4xl">
					More ways to understand your story
				</h2>
			</div>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
				<div class="bg-white rounded-xl p-6 border border-slate-200">
					<h3 class="font-semibold text-slate-900 mb-2">Context & sentiment</h3>
					<p class="text-sm text-slate-600">Understand how you're being portrayed. Positive, neutral, or something to watch.</p>
				</div>

				<div class="bg-white rounded-xl p-6 border border-slate-200">
					<h3 class="font-semibold text-slate-900 mb-2">Popularity insights</h3>
					<p class="text-sm text-slate-600">See which of your images spread the most and where they're being used.</p>
				</div>

				<div class="bg-white rounded-xl p-6 border border-slate-200">
					<h3 class="font-semibold text-slate-900 mb-2">Agency reports</h3>
					<p class="text-sm text-slate-600">Exportable reports for clients with coverage overview and growth metrics.</p>
				</div>

				<div class="bg-white rounded-xl p-6 border border-slate-200">
					<h3 class="font-semibold text-slate-900 mb-2">Browser extension</h3>
					<p class="text-sm text-slate-600">Add pages to your story while browsing. One click, saved forever.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section class="border-b border-slate-100 bg-slate-50">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="text-center max-w-2xl mx-auto mb-12">
				<h2 class="text-3xl font-semibold text-slate-900 sm:text-4xl">
					Start free, grow when you're ready
				</h2>
				<p class="mt-4 text-lg text-slate-600">
					Your story, your pace
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				<!-- Free Tier -->
				<div class="bg-white rounded-2xl border border-slate-200 p-6">
					<div class="mb-5">
						<h3 class="text-lg font-semibold text-slate-900">Free</h3>
						<p class="text-slate-500 text-sm mt-1">Start building your story</p>
					</div>
					<div class="mb-5">
						<span class="text-3xl font-semibold text-slate-900">€0</span>
						<span class="text-slate-500">/month</span>
					</div>
					<ul class="space-y-2.5 mb-6 text-sm">
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600">Unlimited manual submissions</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600">Organize with tags</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600">Timeline view</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600">Takedown letter templates</span>
						</li>
					</ul>
					<Button href="/auth/login" variant="outline" class="w-full rounded-xl py-4 border-slate-300 text-sm">
						Get Started
					</Button>
				</div>

				<!-- Pro Tier -->
				<div class="bg-slate-900 rounded-2xl p-6 text-white relative">
					<div class="absolute top-4 right-4">
						<span class="px-2.5 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">Popular</span>
					</div>
					<div class="mb-5">
						<h3 class="text-lg font-semibold">Pro</h3>
						<p class="text-slate-400 text-sm mt-1">We find your photos</p>
					</div>
					<div class="mb-5">
						<span class="text-3xl font-semibold">€19</span>
						<span class="text-slate-400">/month</span>
					</div>
					<ul class="space-y-2.5 mb-6 text-sm">
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-300">Everything in Free</span>
						</li>
						<li class="flex items-start gap-2.5 group relative">
							<svg class="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-300 border-b border-dashed border-slate-500 cursor-help">Find duplicate images</span>
							<div class="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-white text-slate-700 text-xs rounded-lg shadow-lg z-10">
								Find where the exact same image appears across different websites
							</div>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-300">Auto screenshots</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-300">Wayback archiving</span>
						</li>
					</ul>
					<Button href="/auth/login" class="w-full rounded-xl py-4 bg-white text-slate-900 hover:bg-slate-100 text-sm">
						Start Free Trial
					</Button>
				</div>

				<!-- Agency Tier -->
				<div class="bg-white rounded-2xl border-2 border-blue-200 p-6 relative">
					<div class="mb-5">
						<h3 class="text-lg font-semibold text-slate-900">Agency</h3>
						<p class="text-slate-500 text-sm mt-1">Full presence monitoring</p>
					</div>
					<div class="mb-5">
						<span class="text-3xl font-semibold text-slate-900">€59</span>
						<span class="text-slate-500">/month</span>
					</div>
					<ul class="space-y-2.5 mb-6 text-sm">
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600">Everything in Pro</span>
						</li>
						<li class="flex items-start gap-2.5 group relative">
							<svg class="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600 border-b border-dashed border-slate-400 cursor-help">Active presence scanning</span>
							<div class="absolute left-0 bottom-full mb-2 hidden group-hover:block w-52 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-10">
								We actively search for your name and face across the web, not just duplicates of images you've added
							</div>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
							<span class="text-slate-600">Priority support</span>
						</li>
						<li class="flex items-start gap-2.5 pt-2 border-t border-slate-100 mt-2">
							<span class="text-xs font-medium text-blue-600 uppercase tracking-wide">Coming soon</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<span class="text-slate-400">Sentiment analysis</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<span class="text-slate-400">Context analysis</span>
						</li>
						<li class="flex items-start gap-2.5">
							<svg class="h-4 w-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<span class="text-slate-400">Agency reports</span>
						</li>
					</ul>
					<Button href="/auth/login" class="w-full rounded-xl py-4 bg-slate-900 text-white hover:bg-slate-800 text-sm">
						Start Free Trial
					</Button>
				</div>
			</div>

			<p class="text-center text-sm text-slate-500 mt-8">
				All plans include GDPR compliance and European data hosting
			</p>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-slate-900">
		<div class="mx-auto max-w-6xl px-6 py-20 lg:py-24">
			<div class="text-center max-w-2xl mx-auto">
				<p class="text-blue-400 font-medium mb-4">Your face, your rules</p>
				<h2 class="text-3xl font-semibold text-white sm:text-4xl">
					Ready to start your story?
				</h2>
				<p class="mt-4 text-lg text-slate-400">
					You bring the moments. We'll help you keep them.
				</p>
				<div class="mt-10">
					<Button href="/auth/login" size="lg" class="text-base px-8 py-6 rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-lg">
						Get Started
					</Button>
				</div>
				<p class="mt-6 text-sm text-slate-500">
					Free to start · No credit card required
				</p>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-slate-200 bg-white">
		<div class="mx-auto max-w-6xl px-6 py-12">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
				<div>
					<p class="text-lg font-semibold text-slate-900">Facetracker</p>
					<p class="mt-1 text-sm text-slate-500">Your face, your rules.</p>
				</div>
				<div class="flex flex-wrap gap-6 text-sm text-slate-600">
					<a href="/privacy-policy" class="hover:text-slate-900 transition-colors">Privacy Policy</a>
					<a href="/terms-of-service" class="hover:text-slate-900 transition-colors">Terms of Service</a>
					<a href="/contact" class="hover:text-slate-900 transition-colors">Contact</a>
				</div>
			</div>
			<div class="mt-8 pt-8 border-t border-slate-100">
				<p class="text-sm text-slate-400">
					© 2026 Facetracker. European company. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>
