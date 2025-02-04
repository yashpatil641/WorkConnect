<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 ">
		<div class="max-w-4xl mx-auto mt-10">
			<h1 class="text-3xl font-bold text-green-500 text-center mb-12 animate-fade-in">Dashboard</h1>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- All Jobs Card -->
				<RouterLink to="/alljobs"
					class="group transition-all duration-1000 group bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 hover:bg-white/1 rounded-xl p-6  hover:shadow-xl animate-slide-up">
					<div class="flex flex-col items-center text-center">
						<div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<h2 class="text-xl font-semibold text-white mb-2">Explore Jobs</h2>
						<p class="text-gray-400 text-sm">Browse all available job opportunities</p>
					</div>
				</RouterLink>

				<!-- My Jobs Card -->
				<RouterLink to="/myjobs"
					class="group bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 hover:bg-white/1 rounded-xl p-6 transition-all duration-300 hover:shadow-xl animate-slide-up">
					<div class="flex flex-col items-center text-center">
						<div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
						</div>
						<h2 class="text-xl font-semibold text-white mb-2">Posted Jobs</h2>
						<p class="text-gray-400 text-sm">Manage your job listings</p>
					</div>
				</RouterLink>

				<!-- Applications Card -->
				<RouterLink to="/applications"
					class="group bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 hover:bg-white/1 rounded-xl p-6 transition-all duration-300 hover:shadow-xl animate-slide-up">
					<div class="flex flex-col items-center text-center">
						<div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h2 class="text-xl font-semibold text-white mb-2">Applications</h2>
						<p class="text-gray-400 text-sm">Track your job applications</p>
					</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optional: Add hover animation for cards */
.group:hover {
  transform: translateY(-5px);
}
</style>