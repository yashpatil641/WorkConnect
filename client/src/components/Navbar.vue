<script setup>
import { ref, computed } from 'vue';
import { useAuth, useUser, UserButton, SignInButton, SignIn } from '@clerk/vue';
import { useRoute } from 'vue-router';
import logo from 'C:/Users/Yash/Desktop/projects/WorkConnect/client/public/favicon.svg';

const { isSignedIn } = useAuth();
const { user } = useUser();
const route = useRoute();
const isOpen = ref(false);

const username = computed(() => user.value?.username || user.value?.firstName || 'User');

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/alljobs', label: 'Browse Jobs' },
  { path: '/applications', label: 'Applications' },
  { path: '/myjobs', label: 'Posted Jobs' },
];

const isActiveLink = (path) => route.path === path;
</script>



<template>
  <nav class="fixed w-full z-50 backdrop-blur-lg bg-black/30 supports-backdrop-blur:bg-white/10">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between h-16 px-4 border-b border-white/10">

      <RouterLink to="/" class="flex items-center group">
        <div class="">
          <img :src="logo" alt="Logo" class="h-10  transition-transform duration-200" />
        </div>
        <div class="flex flex-col  ml-3">
          <span class="text-white text-md font-bold leading-tight group-hover:text-green-400 transition-colors">Work</span>
          <span class="text-white text-md font-bold leading-tight group-hover:text-green-400 transition-colors duration-500">Connect</span>
        </div>
      </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="px-4 py-2 text-sm text-gray-300 rounded-lg transition-all duration-200 hover:text-white hover:bg-white/10"
            :class="{ 'bg-green-500/20 text-green-400 font-medium': isActiveLink(item.path) }"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <!-- User Profile Section -->
        <div class="hidden md:flex items-center">
          <template v-if="isSignedIn">
            <div class="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span class="text-sm text-gray-300">{{ username }}</span>
              <UserButton afterSignOutUrl="/"/>
            </div>
          </template>
          <template v-else>
              <button class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                           text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:scale-105">
                           <SignInButton/>
              </button>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isOpen = !isOpen"
          class="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
        >
          <svg 
            class="w-6 h-6" 
            :class="{'hidden': isOpen, 'block': !isOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg 
            class="w-6 h-6" 
            :class="{'block': isOpen, 'hidden': !isOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-show="isOpen" class="md:hidden">
          <div class="py-2 space-y-1 backdrop-blur-md bg-black/30">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="block px-4 py-2 text-base text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              :class="{ 'bg-green-500/20 text-green-400': isActiveLink(item.path) }"
              @click="isOpen = false"
            >
              {{ item.label }}
            </RouterLink>
            
            <div v-if="isSignedIn" class="pt-4 mt-4 border-t border-white/10">
              <div class="px-4 flex items-center justify-between">
                <span class="text-sm text-gray-300">{{ username }}</span>
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

