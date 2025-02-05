<script setup>
import Hero from '../components/Hero.vue'
import HomeCards from '../components/HomeCards.vue'
import JobListings from '../components/JobListings.vue'
import { ref } from 'vue'

const categories = [
  { name: 'Technology', count: '2.5k+', icon: '💻' },
  { name: 'Marketing', count: '1.8k+', icon: '📢' },
  { name: 'Design', count: '1.2k+', icon: '🎨' },
  { name: 'Finance', count: '900+', icon: '💰' }
]

const features = [
  {
    title: 'Smart Job Matching',
    description: 'AI-powered job recommendations based on your skills',
    icon: '🎯'
  },
  {
    title: 'Real-time Updates',
    description: 'Get instant notifications for new opportunities',
    icon: '⚡'
  },
  {
    title: 'Easy Applications',
    description: 'One-click apply with your saved profile',
    icon: '📝'
  }
]

const testimonials = ref([
  {
    name: 'John Doe',
    role: 'Software Engineer',
    company: 'Tech Corp',
    image: '/avatars/1.jpg',
    text: 'Found my dream job within weeks!'
  },
  // ... more testimonials
])
</script>

<template>
  <div class="min-h-screen  bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
    <Hero />
    <HomeCards />
    
    <!-- Categories Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-green-500 mb-12">Popular Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="category in categories" 
               :key="category.name"
               class="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <span class="text-4xl mb-4 block">{{ category.icon }}</span>
            <h3 class="text-white font-semibold mb-2">{{ category.name }}</h3>
            <p class="text-green-400">{{ category.count }} jobs</p>
          </div>
        </div>
      </div>
    </section>

    <JobListings :limit="6" :showButton="true" />

    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-green-500 mb-12">Why Choose Us</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="feature in features" 
               :key="feature.title"
               class="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <span class="text-4xl mb-4 block">{{ feature.icon }}</span>
            <h3 class="text-xl font-semibold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <div class="bg-gradient-to-r from-green-300/10 to-green-400/10 rounded-2xl p-12 backdrop-blur-sm">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p class="text-gray-300 mb-8">Get the latest jobs delivered to your inbox</p>
          <form class="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
            <button class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.transform {
  transition: transform 0.3s ease-in-out;
}
</style>