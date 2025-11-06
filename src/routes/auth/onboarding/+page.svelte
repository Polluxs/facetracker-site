<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';

	let currentStep = 1;
	let isLoading = false;
	let error = '';
	let success = '';

	// Form data
	let name = '';
	let email = '';
	let emailConfirm = '';
	let phone = '';
	let canCallForCheckup = false;
	let idFile: File | null = null;
	let photoFiles: File[] = [];

	// File input refs
	let idFileInput: HTMLInputElement;
	let photoFilesInput: HTMLInputElement;

	function nextStep() {
		error = '';

		if (currentStep === 1) {
			// Validate step 1
			if (!name.trim()) {
				error = 'Please enter your name';
				return;
			}
			if (!email.trim()) {
				error = 'Please enter your email';
				return;
			}
			if (!emailConfirm.trim()) {
				error = 'Please confirm your email';
				return;
			}
			if (email !== emailConfirm) {
				error = 'Email addresses do not match';
				return;
			}
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				error = 'Please enter a valid email address';
				return;
			}
		} else if (currentStep === 2) {
			// Validate step 2
			if (!idFile) {
				error = 'Please upload your ID for verification';
				return;
			}
		}

		currentStep++;
	}

	function previousStep() {
		error = '';
		currentStep--;
	}

	function handleIdFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			idFile = target.files[0];
			error = '';
		}
	}

	function handlePhotoFilesChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			photoFiles = Array.from(target.files);
			error = '';
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';

		// Validate step 3
		if (photoFiles.length === 0) {
			error = 'Please upload at least one photo of yourself';
			return;
		}

		isLoading = true;

		try {
			// For now, we'll just send a magic link with the registration
			// In a real implementation, you would upload the files first
			const response = await fetch('/api/auth/sign-in/magic-link', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					name,
					callbackURL: '/app'
				})
			});

			const result = await response.json();

			if (!response.ok) {
				error = result.error || 'Failed to send magic link';
			} else {
				success = `🎉 Almost there! We've sent a verification link to ${email}. Click the link in your email to verify your account and complete your onboarding.`;
			}
		} catch (err) {
			console.error(err);

			if (err instanceof TypeError && err.message.includes('fetch')) {
				error = PUBLIC_ENVIRONMENT === 'development'
					? 'Cannot connect to authentication service. Please ensure the database is running with: pnpm run db:start'
					: 'Authentication service temporarily unavailable';
			} else if (err instanceof Error && err.message.includes('DATABASE_CONNECTION_ERROR')) {
				error = PUBLIC_ENVIRONMENT === 'development'
					? 'Database connection failed. Please ensure the database is running with: pnpm run db:start'
					: 'Authentication service temporarily unavailable';
			} else {
				error = 'An unexpected error occurred';
			}
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Get Started - Facetracker</title>
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

	.step-indicator {
		transition: all 0.3s ease;
	}

	.step-indicator.active {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		transform: scale(1.1);
	}

	.step-indicator.completed {
		background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
	}

	.file-upload-zone {
		border: 2px dashed #d1d5db;
		transition: all 0.3s ease;
	}

	.file-upload-zone:hover {
		border-color: #3b82f6;
		background: #eff6ff;
	}

	.file-upload-zone.has-file {
		border-color: #10b981;
		background: #f0fdf4;
	}
</style>

<div class="min-h-screen bg-white">
	<!-- Onboarding Section -->
	<section class="relative overflow-hidden">
		<!-- Animated background blobs -->
		<div class="blob top-20 left-20 w-72 h-72 bg-blue-400" style="animation-delay: 0s;"></div>
		<div class="blob top-40 right-20 w-96 h-96 bg-purple-400" style="animation-delay: 2s;"></div>
		<div class="blob bottom-20 left-1/3 w-80 h-80 bg-cyan-400" style="animation-delay: 4s;"></div>

		<div class="relative flex min-h-screen items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
			<div class="w-full max-w-2xl space-y-8">
				{#if !success}
					<div class="text-center animate-fade-in-up">
						<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Get Started in <span class="gradient-text">1, 2, 3</span>
						</h1>
						<p class="mt-4 text-lg text-gray-600">
							Complete your profile to start tracking
						</p>
					</div>

					<!-- Step Indicators -->
					<div class="flex justify-center items-center gap-4 animate-fade-in-up delay-100">
						<div class="flex items-center gap-4">
							<div class="step-indicator {currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''} h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg {currentStep === 1 || currentStep > 1 ? '' : 'bg-gray-300'}">
								{#if currentStep > 1}
									<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
									</svg>
								{:else}
									1
								{/if}
							</div>
							<div class="h-1 w-16 rounded {currentStep > 1 ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}"></div>
							<div class="step-indicator {currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''} h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg {currentStep === 2 || currentStep > 2 ? '' : 'bg-gray-300'}">
								{#if currentStep > 2}
									<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
									</svg>
								{:else}
									2
								{/if}
							</div>
							<div class="h-1 w-16 rounded {currentStep > 2 ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}"></div>
							<div class="step-indicator {currentStep === 3 ? 'active' : ''} h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg {currentStep === 3 ? '' : 'bg-gray-300'}">
								3
							</div>
						</div>
					</div>

					<div class="p-10 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl shadow-blue-500/10 animate-fade-in-up delay-200">
						<form onsubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
							<!-- Step 1: Personal Info -->
							{#if currentStep === 1}
								<div class="space-y-6">
									<div class="text-center mb-8">
										<h2 class="text-2xl font-bold text-gray-900">Your Information</h2>
										<p class="text-sm text-gray-600 mt-2">Let's start with the basics</p>
									</div>

									<div class="space-y-2">
										<Label for="name" class="text-gray-900 font-medium">Full Name</Label>
										<Input
											id="name"
											type="text"
											bind:value={name}
											placeholder="John Doe"
											required
											class="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
										/>
									</div>

									<div class="space-y-2">
										<Label for="email" class="text-gray-900 font-medium">Email Address</Label>
										<Input
											id="email"
											type="email"
											bind:value={email}
											placeholder="john@example.com"
											required
											class="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
										/>
									</div>

									<div class="space-y-2">
										<Label for="emailConfirm" class="text-gray-900 font-medium">Confirm Email Address</Label>
										<Input
											id="emailConfirm"
											type="email"
											bind:value={emailConfirm}
											placeholder="john@example.com"
											required
											class="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
										/>
										<p class="text-xs text-gray-500 mt-1">
											We ask again because we don't want your account linked to the wrong email address
										</p>
									</div>

									<div class="space-y-2">
										<Label for="phone" class="text-gray-900 font-medium">Phone Number <span class="text-gray-400 font-normal">(optional)</span></Label>
										<Input
											id="phone"
											type="tel"
											bind:value={phone}
											placeholder="+1 (555) 123-4567"
											class="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
										/>
									</div>

									<div class="flex items-start gap-3 p-4 rounded-xl border-2 transition-colors duration-300 {canCallForCheckup ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}">
										<input
											type="checkbox"
											id="canCallForCheckup"
											bind:checked={canCallForCheckup}
											class="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-blue-500 {canCallForCheckup ? 'text-green-600' : 'text-blue-600'}"
										/>
										<label for="canCallForCheckup" class="text-sm cursor-pointer {canCallForCheckup ? 'text-green-800' : 'text-gray-700'}">
											{#if canCallForCheckup}
												<span class="font-bold">Awesome!</span> Let's talk soon! 🤩
											{:else}
												Check this if we can contact you for a chat. No sales calls, just a friendly chat.
											{/if}
										</label>
									</div>
								</div>
							{/if}

							<!-- Step 2: Verify Identity -->
							{#if currentStep === 2}
								<div class="space-y-6">
									<div class="text-center mb-8">
										<h2 class="text-2xl font-bold text-gray-900">Verify Your Identity</h2>
										<p class="text-sm text-gray-600 mt-2">This ensures ethical use and prevents misuse</p>
									</div>

									<div class="space-y-4">
										<Label class="text-gray-900 font-medium">Upload Valid ID</Label>
										<div
											class="file-upload-zone {idFile ? 'has-file' : ''} rounded-xl p-8 text-center cursor-pointer"
											onclick={() => idFileInput?.click()}
											onkeydown={(e) => e.key === 'Enter' && idFileInput?.click()}
											role="button"
											tabindex="0"
										>
											<input
												bind:this={idFileInput}
												type="file"
												accept="image/*,.pdf"
												onchange={handleIdFileChange}
												class="hidden"
											/>
											{#if idFile}
												<div class="space-y-2">
													<svg class="h-12 w-12 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
													</svg>
													<p class="text-green-700 font-medium">{idFile.name}</p>
													<p class="text-sm text-gray-500">Click to change</p>
												</div>
											{:else}
												<div class="space-y-2">
													<svg class="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
													</svg>
													<p class="text-gray-700 font-medium">Click to upload your ID</p>
													<p class="text-sm text-gray-500">Driver's license, passport, or national ID</p>
												</div>
											{/if}
										</div>
										<p class="text-xs text-gray-500 text-center">
											Your ID is used only for verification and stored securely
										</p>
									</div>
								</div>
							{/if}

							<!-- Step 3: Upload Photos -->
							{#if currentStep === 3}
								<div class="space-y-6">
									<div class="text-center mb-8">
										<h2 class="text-2xl font-bold text-gray-900">Upload Your Photos</h2>
										<p class="text-sm text-gray-600 mt-2">These will be used for facial comparison</p>
									</div>

									<div class="space-y-4">
										<Label class="text-gray-900 font-medium">Select Photos</Label>
										<div
											class="file-upload-zone {photoFiles.length > 0 ? 'has-file' : ''} rounded-xl p-8 text-center cursor-pointer"
											onclick={() => photoFilesInput?.click()}
											onkeydown={(e) => e.key === 'Enter' && photoFilesInput?.click()}
											role="button"
											tabindex="0"
										>
											<input
												bind:this={photoFilesInput}
												type="file"
												accept="image/*"
												multiple
												onchange={handlePhotoFilesChange}
												class="hidden"
											/>
											{#if photoFiles.length > 0}
												<div class="space-y-2">
													<svg class="h-12 w-12 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
													</svg>
													<p class="text-green-700 font-medium">{photoFiles.length} photo{photoFiles.length > 1 ? 's' : ''} selected</p>
													<p class="text-sm text-gray-500">Click to change</p>
												</div>
											{:else}
												<div class="space-y-2">
													<svg class="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
													</svg>
													<p class="text-gray-700 font-medium">Click to upload photos</p>
													<p class="text-sm text-gray-500">Upload clear photos of yourself</p>
												</div>
											{/if}
										</div>
										<p class="text-xs text-gray-500 text-center">
											Only your chosen reference photos are stored. No biometric data is kept.
										</p>
									</div>
								</div>
							{/if}

							{#if error}
								<div class="rounded-xl bg-red-50 border-2 border-red-100 p-4 mt-6">
									<p class="text-sm text-red-800">{error}</p>
								</div>
							{/if}

							<div class="flex gap-4 mt-8">
								{#if currentStep > 1}
									<Button
										type="button"
										variant="outline"
										onclick={previousStep}
										class="flex-1 h-12 rounded-xl border-2 text-base font-medium"
									>
										← Previous
									</Button>
								{/if}

								<Button
									type="submit"
									class="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 text-base font-medium"
									disabled={isLoading}
								>
									{#if isLoading}
										<span class="mr-2">
											<svg
												class="h-4 w-4 animate-spin"
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
										</span>
									{/if}
									{currentStep < 3 ? 'Next →' : 'Complete Onboarding'}
								</Button>
							</div>
						</form>

						<div class="mt-6 text-center">
							<p class="text-xs text-gray-500 pt-4 border-t border-gray-200">
								By creating an account, you agree to our <a href="/terms-of-service" class="text-blue-600 hover:text-purple-600 underline">terms of service</a> and <a href="/privacy-policy" class="text-blue-600 hover:text-purple-600 underline">privacy policy</a>
							</p>
						</div>
					</div>

					<!-- Links outside card -->
					<div class="mt-6 text-center space-y-3 animate-fade-in-up delay-200">
						<p class="text-sm text-gray-600">
							Already have an account?
							<a
								href="/auth/login"
								class="font-medium text-blue-600 hover:text-purple-600 transition-colors"
							>
								Sign in
							</a>
						</p>
						<p class="text-sm">
							<a
								href="/"
								class="font-medium text-gray-500 hover:text-gray-900 transition-colors"
							>
								← Back to Home
							</a>
						</p>
					</div>
				{:else}
					<!-- Success State -->
					<div class="text-center space-y-8 animate-fade-in-up">
						<div class="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-2xl shadow-green-500/30">
							<svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
							</svg>
						</div>

						<div>
							<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Check Your <span class="gradient-text">Email</span>
							</h1>
							<div class="mt-6 rounded-xl bg-green-50 border-2 border-green-100 p-6 max-w-xl mx-auto">
								<p class="text-sm text-green-800">{success}</p>
							</div>
						</div>

						<div class="space-y-3">
							<p class="text-sm text-gray-600">
								Didn't receive the email?
								<button
									type="button"
									class="font-medium text-blue-600 hover:text-purple-600 transition-colors"
								>
									Resend verification email
								</button>
							</p>
							<p class="text-sm">
								<a
									href="/"
									class="font-medium text-gray-500 hover:text-gray-900 transition-colors"
								>
									← Back to Home
								</a>
							</p>
						</div>
					</div>
				{/if}

				{#if PUBLIC_ENVIRONMENT === 'development' && !success}
					<div class="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100/50 p-6 text-sm animate-fade-in delay-200">
						<h4 class="font-semibold text-blue-900 mb-3">🧪 Development Mode</h4>
						<p class="text-blue-700 mb-3">
							File uploads are simulated in development. Magic link will be sent for verification.
						</p>
						<ul class="text-blue-600 space-y-2">
							<li>• Emails sent to <code class="bg-blue-100/70 px-2 py-0.5 rounded">delivered@resend.dev</code></li>
							<li>• Check server console for magic link URL</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</section>
</div>
