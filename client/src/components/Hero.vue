<script setup>
import { defineProps } from 'vue';
import hero_img from '@/assets/img/hero_img_2.svg';

defineProps({
  title: {
    type: String,
    default: 'Discover Your Dream Job: Explore Our Vibrant Job ',
  },
  subtitle: {
    type: String,
    default: 'Find the job that fits your skills and needs',
  },
});
</script>
<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
    
    <!-- Main Content -->
    <div class="grid lg:grid-cols-2 gap-8 h-screen mt-6">
      <!-- Left Section -->
      <section class="p-8 lg:p-16 flex items-center">
        <div class="space-y-8 max-w-2xl">
          <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent animate-fade-in">
            {{ title }}
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-400 leading-relaxed animate-fade-in-delay">
            {{ subtitle }}
          </p>
          
          <div class="flex flex-wrap gap-4 animate-fade-in-delay-2">
            <RouterLink 
              to="/alljobs"
              class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Find Jobs
            </RouterLink>
            
            <RouterLink 
              to="/jobs/add"
              class="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 border border-white/20"
            >
              Post a Job
            </RouterLink>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div>
              <h4 class="text-3xl font-bold text-green-400">2k+</h4>
              <p class="text-gray-400">Active Jobs</p>
            </div>
            <div>
              <h4 class="text-3xl font-bold text-green-400">10k+</h4>
              <p class="text-gray-400">Companies</p>
            </div>
            <div>
              <h4 class="text-3xl font-bold text-green-400">50k+</h4>
              <p class="text-gray-400">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Section - Image -->
      <section class="hidden lg:flex items-center justify-center p-16">
        <div class="relative">
          <!-- Add your hero image here -->
          <img 
            :src="hero_img" 
            alt="Hero"
            class="w-[180%] h-auto max-w-lg rounded-lg shadow-2xl animate-float"
          />
          <!-- Decorative Elements -->
          <div class="absolute -z-10 top-1/2 left-1/2 w-96 h-96 bg-green-500/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-white {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>