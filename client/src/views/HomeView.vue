<script setup>
import Hero from '../components/Hero.vue'
import HomeCards from '../components/HomeCards.vue'
import JobListings from '../components/JobListings.vue'
import { ref } from 'vue'

const categories = [
  {
    name: 'Technology',
    count: '2.5k+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
  },
  {
    name: 'Marketing',
    count: '1.8k+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>'
  },
  {
    name: 'Design',
    count: '1.2k+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>'
  },
  {
    name: 'Finance',
    count: '900+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
  },
  {
    name: 'Healthcare',
    count: '1.4k+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.8 12H9a3 3 0 003-3V6a2 2 0 012-2h.2" /></svg>'
  },
  {
    name: 'Education',
    count: '750+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>'
  },
  {
    name: 'Remote',
    count: '2.0k+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
  },
  {
    name: 'Engineering',
    count: '1.1k+',
    icon: '<svg class="h-12 w-12 mx-auto text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
  }
]

const features = [
  {
    title: 'Smart Job Matching',
    description: 'Our AI-powered system matches your skills and experience to the perfect opportunities, saving you time in your job search.',
    icon: '<svg class="h-12 w-12 mb-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>'
  },
  {
    title: 'Real-time Updates',
    description: 'Get instant notifications when new opportunities matching your profile are posted. Never miss your dream job again.',
    icon: '<svg class="h-12 w-12 mb-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>'
  },
  {
    title: 'One-Click Applications',
    description: 'Create your professional profile once and apply to jobs with a single click. Manage all your applications in one dashboard.',
    icon: '<svg class="h-12 w-12 mb-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>'
  }
]

const stats = [
  { figure: '25k+', description: 'Active Jobs' },
  { figure: '12k+', description: 'Companies' },
  { figure: '150k+', description: 'Job Seekers' },
  { figure: '18k+', description: 'Successful Hires' }
];

const testimonials = ref([
  {
    name: 'Sophia Chen',
    role: 'Senior Frontend Developer',
    company: 'TechVision Inc.',
    image: 'https://via.placeholder.com/100',
    text: 'WorkConnect helped me find a remote position that perfectly matches my skills and lifestyle preferences. The application process was seamless!'
  },
  {
    name: 'Marcus Johnson',
    role: 'UX Designer',
    company: 'Creative Minds',
    image: 'https://via.placeholder.com/100',
    text: 'I posted a job opening and received high-quality applications within days. The talent pool on WorkConnect is outstanding!'
  },
  {
    name: 'Aisha Patel',
    role: 'Data Scientist',
    company: 'DataFlow Systems',
    image: 'https://via.placeholder.com/100',
    text: 'The skills matching feature saved me countless hours. I only received notifications for jobs that truly matched my expertise.'
  }
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <Hero />
    <HomeCards />

    <!-- Categories Section -->
    <section class="py-20 px-4 mt-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-green-500 mb-4">Explore Job Categories</h2>
        <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Discover opportunities across various industries
          and find the perfect role for your skills and experience</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="category in categories" :key="category.name"
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-green-500/20 group">
            <div v-html="category.icon" class="transition-transform duration-300 group-hover:scale-110"></div>
            <h3 class="text-white font-semibold mt-4 mb-2 group-hover:text-green-400 transition-colors">{{ category.name
              }}</h3>
            <p class="text-green-400">{{ category.count }} jobs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->


    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-green-500 mb-4">Why Choose WorkConnect</h2>
        <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Tools and features designed to make your job search
          or hiring process simpler and more effective</p>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title"
            class="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-white/5 hover:border-green-500/20">
            <div v-html="feature.icon"></div>
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-green-400">{{ feature.title }}</h3>
            <p class="text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-4 ">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-green-500 mb-4">Success Stories</h2>
        <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Hear from professionals who found their perfect
          match through WorkConnect</p>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name"
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full overflow-hidden mr-4 bg-green-500/20">
                <img :src="testimonial.image" alt="User" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="text-white font-medium">{{ testimonial.name }}</h4>
                <p class="text-gray-400 text-sm">{{ testimonial.role }} at {{ testimonial.company }}</p>
              </div>
            </div>
            <p class="text-gray-300 italic">"{{ testimonial.text }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <div
          class="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-2xl p-12 backdrop-blur-sm border border-white/5">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Connected</h2>
          <p class="text-gray-300 mb-8">Get weekly job alerts and career tips delivered straight to your inbox</p>
          <form class="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email"
              class="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500">
            <button
              class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-colors duration-300 font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4 pb-20">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-green-500 mb-6">Ready to Take the Next Step?</h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">Whether you're looking for your dream job or searching for the
          perfect candidate, WorkConnect has tools to help you succeed.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/alljobs"
            class="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium">
            Find Jobs
          </RouterLink>
          <RouterLink to="/jobs/add"
            class="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20">
            Post a Job
          </RouterLink>
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