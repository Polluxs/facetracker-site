<script lang="ts">
	type TemplateType = 'dmca' | 'gdpr' | 'general';
	type RequestStatus = 'draft' | 'sent' | 'pending' | 'resolved';

	interface TakedownRequest {
		id: number;
		site: string;
		url: string;
		type: TemplateType;
		status: RequestStatus;
		createdOn: string;
	}

	let activeTab = $state<'generator' | 'tracking'>('generator');
	let selectedTemplate = $state<TemplateType>('dmca');
	let formData = $state({
		url: '',
		yourName: '',
		description: '',
		email: ''
	});
	let generatedLetter = $state('');
	let copied = $state(false);

	// Mock data
	const requests: TakedownRequest[] = [
		{ id: 1, site: 'example-blog.com', url: 'https://example-blog.com/post/123', type: 'dmca', status: 'sent', createdOn: 'Jan 12, 2026' },
		{ id: 2, site: 'photo-sharing.net', url: 'https://photo-sharing.net/gallery/456', type: 'gdpr', status: 'pending', createdOn: 'Jan 10, 2026' },
		{ id: 3, site: 'news-site.org', url: 'https://news-site.org/article/789', type: 'general', status: 'resolved', createdOn: 'Jan 5, 2026' }
	];

	const templates = {
		dmca: {
			title: 'DMCA Takedown Notice',
			description: 'For copyright infringement. Use when your copyrighted image is used without permission.',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
		},
		gdpr: {
			title: 'GDPR Right to Erasure',
			description: 'For EU privacy law requests. Use when you want your personal data removed.',
			icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
		},
		general: {
			title: 'General Removal Request',
			description: 'A polite request for image removal. Good starting point for most cases.',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		}
	};

	function generateLetter() {
		const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

		if (selectedTemplate === 'dmca') {
			generatedLetter = `DMCA Takedown Notice

Date: ${date}

To Whom It May Concern,

I am writing to notify you of an infringement of my copyrighted material on your website.

Infringing Material URL: ${formData.url}

I, ${formData.yourName}, am the copyright owner of the image(s) displayed at the above URL. I have not authorized the use of this material on your website.

${formData.description}

I have a good faith belief that the use of the copyrighted material described above is not authorized by the copyright owner, its agent, or the law.

I declare under penalty of perjury that the above information is accurate and that I am the copyright owner or am authorized to act on behalf of the owner.

Please remove or disable access to this material immediately.

Sincerely,
${formData.yourName}
${formData.email}`;
		} else if (selectedTemplate === 'gdpr') {
			generatedLetter = `Subject Access Request - Right to Erasure (GDPR Article 17)

Date: ${date}

To the Data Controller,

I am writing to request the erasure of my personal data that you currently hold and process.

URL containing my personal data: ${formData.url}

Requester: ${formData.yourName}
Email: ${formData.email}

${formData.description}

Under Article 17 of the General Data Protection Regulation (GDPR), I have the right to request the erasure of personal data concerning me. I am exercising this right and request that you delete my personal data, specifically the image(s) at the URL above.

Please confirm within one month that you have complied with this request, as required by Article 12 of the GDPR.

If you do not comply with this request, I reserve the right to lodge a complaint with my local supervisory authority.

Yours faithfully,
${formData.yourName}`;
		} else {
			generatedLetter = `Image Removal Request

Date: ${date}

Dear Website Administrator,

I am writing to kindly request the removal of an image of me from your website.

Image Location: ${formData.url}

${formData.description}

I would appreciate if you could remove this image from your website at your earliest convenience. If you have any questions or need additional information to process this request, please contact me at ${formData.email}.

Thank you for your understanding and cooperation.

Best regards,
${formData.yourName}
${formData.email}`;
		}
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(generatedLetter);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function getStatusClasses(status: RequestStatus): string {
		switch (status) {
			case 'draft': return 'bg-slate-100 text-slate-600';
			case 'sent': return 'bg-blue-100 text-blue-700';
			case 'pending': return 'bg-amber-100 text-amber-700';
			case 'resolved': return 'bg-emerald-100 text-emerald-700';
		}
	}
</script>

<svelte:head>
	<title>Takedowns - Facetracker</title>
</svelte:head>

<div class="p-6 lg:p-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Takedowns</h1>
		<p class="mt-1 text-slate-600">Generate removal requests and track their status</p>
	</div>

	<!-- Tabs -->
	<div class="flex gap-2 mb-8">
		<button
			onclick={() => activeTab = 'generator'}
			class="px-4 py-2 rounded-xl font-medium transition-all {activeTab === 'generator'
				? 'bg-slate-900 text-white'
				: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}"
		>
			Template Generator
		</button>
		<button
			onclick={() => activeTab = 'tracking'}
			class="px-4 py-2 rounded-xl font-medium transition-all {activeTab === 'tracking'
				? 'bg-slate-900 text-white'
				: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}"
		>
			Track Requests ({requests.length})
		</button>
	</div>

	{#if activeTab === 'generator'}
		<div class="grid lg:grid-cols-2 gap-8">
			<!-- Template Selection & Form -->
			<div class="space-y-6">
				<!-- Template Selection -->
				<div class="rounded-2xl bg-white border border-slate-200 p-6">
					<h2 class="text-lg font-semibold text-slate-900 mb-4">Select Template Type</h2>
					<div class="space-y-3">
						{#each Object.entries(templates) as [key, template]}
							<button
								onclick={() => { selectedTemplate = key as TemplateType; generatedLetter = ''; }}
								class="w-full p-4 rounded-xl border-2 transition-all text-left {selectedTemplate === key
									? 'border-blue-500 bg-blue-50'
									: 'border-slate-200 hover:border-slate-300'}"
							>
								<div class="flex items-start gap-3">
									<div class="h-10 w-10 rounded-lg bg-gradient-to-br {key === 'dmca' ? 'from-blue-500 to-cyan-500' : key === 'gdpr' ? 'from-purple-500 to-indigo-500' : 'from-slate-500 to-slate-600'} flex items-center justify-center flex-shrink-0">
										<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={template.icon} />
										</svg>
									</div>
									<div>
										<p class="font-medium text-slate-900">{template.title}</p>
										<p class="text-sm text-slate-500">{template.description}</p>
									</div>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Form -->
				<div class="rounded-2xl bg-white border border-slate-200 p-6">
					<h2 class="text-lg font-semibold text-slate-900 mb-4">Fill in Details</h2>
					<div class="space-y-4">
						<div>
							<label for="url" class="block text-sm font-medium text-slate-700 mb-1">Page URL *</label>
							<input
								id="url"
								type="url"
								bind:value={formData.url}
								placeholder="https://example.com/page-with-your-image"
								class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="name" class="block text-sm font-medium text-slate-700 mb-1">Your Full Name *</label>
							<input
								id="name"
								type="text"
								bind:value={formData.yourName}
								placeholder="John Doe"
								class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-slate-700 mb-1">Your Email *</label>
							<input
								id="email"
								type="email"
								bind:value={formData.email}
								placeholder="john@example.com"
								class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="description" class="block text-sm font-medium text-slate-700 mb-1">Additional Details</label>
							<textarea
								id="description"
								bind:value={formData.description}
								placeholder="Describe why you want this image removed..."
								rows="3"
								class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
							></textarea>
						</div>
						<button
							onclick={generateLetter}
							disabled={!formData.url || !formData.yourName || !formData.email}
							class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Generate Letter
						</button>
					</div>
				</div>
			</div>

			<!-- Generated Letter -->
			<div class="rounded-2xl bg-white border border-slate-200 p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-lg font-semibold text-slate-900">Generated Letter</h2>
					{#if generatedLetter}
						<button
							onclick={copyToClipboard}
							class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
						>
							{#if copied}
								<svg class="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								Copied!
							{:else}
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
								Copy
							{/if}
						</button>
					{/if}
				</div>

				{#if generatedLetter}
					<div class="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-700 whitespace-pre-wrap max-h-[600px] overflow-y-auto">
						{generatedLetter}
					</div>
					<div class="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
						<p class="text-sm text-blue-800">
							<strong>Next steps:</strong> Copy this letter and send it to the website administrator or hosting provider. You can usually find contact information in the website's footer, privacy policy, or WHOIS records.
						</p>
					</div>
				{:else}
					<div class="h-[400px] flex items-center justify-center bg-slate-50 rounded-xl">
						<div class="text-center">
							<svg class="h-12 w-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<p class="text-slate-500">Fill in the form and click "Generate Letter"</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<!-- Tracking Tab -->
		<div class="rounded-2xl bg-white border border-slate-200 shadow-sm">
			<div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
				<div>
					<h2 class="text-lg font-semibold text-slate-900">Your Requests</h2>
					<p class="text-sm text-slate-500">Track the status of your takedown requests</p>
				</div>
				<button
					onclick={() => activeTab = 'generator'}
					class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					New Request
				</button>
			</div>

			{#if requests.length === 0}
				<div class="p-8 text-center">
					<svg class="h-12 w-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<p class="text-slate-500 mb-4">No takedown requests yet</p>
					<button
						onclick={() => activeTab = 'generator'}
						class="text-blue-600 hover:text-blue-700 font-medium"
					>
						Create your first request
					</button>
				</div>
			{:else}
				<div class="divide-y divide-slate-100">
					{#each requests as request}
						<div class="p-4 hover:bg-slate-50 transition-colors">
							<div class="flex items-center justify-between gap-4">
								<div class="flex items-center gap-4 flex-1 min-w-0">
									<div class="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
										<svg class="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={templates[request.type].icon} />
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<p class="font-medium text-slate-900">{request.site}</p>
										<p class="text-sm text-slate-500 truncate">{request.url}</p>
										<div class="flex items-center gap-2 mt-1">
											<span class="text-xs text-slate-400">{templates[request.type].title}</span>
											<span class="text-xs text-slate-300">|</span>
											<span class="text-xs text-slate-400">{request.createdOn}</span>
										</div>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<span class="px-2.5 py-1 rounded-full text-xs font-medium {getStatusClasses(request.status)}">
										{request.status}
									</span>
									<button class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
										<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
