<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="px-4 mt-24">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Find Jobs Card -->
        <RouterLink to="/alljobs" class="group">
          <div class="bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 
                      rounded-xl p-6 transition-all duration-300 
                      border border-white/5 min-h-[120px] flex items-start">
            <div class="flex items-start space-x-4 w-full">
              <div class="bg-green-500/20 p-3 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">Find Jobs</h3>
                <p class="text-gray-400 mt-2 text-sm line-clamp-2">Browse through thousands of job opportunities</p>
              </div>
            </div>
          </div>
        </RouterLink>

        <!-- Post Job Card -->
        <RouterLink to="/jobs/add" class="group">
          <div class="bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 
                      rounded-xl p-6 transition-all duration-300 
                      border border-white/5 min-h-[120px] flex items-start">
            <div class="flex items-start space-x-4 w-full">
              <div class="bg-green-500/20 p-3 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">Post a Job</h3>
                <p class="text-gray-400 mt-2 text-sm line-clamp-2">Create and manage job listings</p>
              </div>
            </div>
          </div>
        </RouterLink>

        <!-- Track Applications Card -->
        <RouterLink to="/applications" class="group">
          <div class="bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 
                      rounded-xl p-6 transition-all duration-300 
                      border border-white/5 min-h-[120px] flex items-start">
            <div class="flex items-start space-x-4 w-full">
              <div class="bg-green-500/20 p-3 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">Track Applications</h3>
                <p class="text-gray-400 mt-2 text-sm line-clamp-2">Monitor your job application status</p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>