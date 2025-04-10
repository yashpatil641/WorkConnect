<script setup>
import { RouterLink } from 'vue-router';
import JobListing from '../components/JobListing.vue';
import { reactive, onMounted, watchEffect, ref, computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import { useUser, useAuth } from '@clerk/vue';

const { isLoaded, getToken } = useAuth();
const { user } = useUser();
const state = reactive({ jobs: [], isLoading: true });
const searchQuery = ref('');
const selectedType = ref('ALL');
const jobTypes = ['ALL', 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'REMOTE'];

const filteredJobs = computed(() => {
  return state.jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === 'ALL' || job.type === selectedType.value;
    return matchesSearch && matchesType;
  });
});

onMounted(async () => {
  try {
    const token = await getToken.value();
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/myjobs/${user.value.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    state.jobs = response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    state.isLoading = false;
  }
});
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <!-- Header Section -->
    <div class=" py-10 px-4">
      <div class="max-w-5xl mx-auto text-center mt-16">
        <h1 class="text-3xl font-bold text-green-500 mb-3 animate-fade-in">
          Manage Your Job Listings
        </h1>
        <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
          Create, edit and track all of your posted job opportunities
        </p>
        
        <RouterLink 
          to="/jobs/add"
          class="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 mb-6 mt-2 transform hover:scale-105"
        >
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post New Job
          </span>
        </RouterLink>
        
        <!-- Search and Filter -->
        <div class="flex flex-col md:flex-row gap-3 justify-center items-center mt-8">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search your listings..."
            class="w-full md:w-72 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
          <select 
            v-model="selectedType"
            class="w-full md:w-40 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 appearance-none"
          >
            <option v-for="type in jobTypes" :key="type" :value="type">
              {{ type.replace('_', ' ') }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Jobs Grid -->
    <div class="container mx-auto px-4 py-10">
      <div v-if="state.isLoading" class="flex justify-center items-center py-20">
        <PulseLoader color="#22c55e" size="8px" />
      </div>
      
      <TransitionGroup 
        name="job-list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <JobListing 
          v-for="job in filteredJobs" 
          :key="job.id" 
          :job="job"
          :showActions="true"
          class="job-item"
        />
      </TransitionGroup>

      <div v-if="!state.isLoading && filteredJobs.length === 0" 
           class="flex flex-col items-center justify-center py-20">
        <div class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10 max-w-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">No Jobs Posted Yet</h3>
          <p class="text-gray-400 mb-6">Start by posting your first job listing</p>
          <RouterLink 
            to="/jobs/add"
            class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Post a Job
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.job-list-enter-active,
.job-list-leave-active {
  transition: all 0.5s ease;
}

.job-list-enter-from,
.job-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.job-item {
  transition: transform 0.3s ease;
}

.job-item:hover {
  transform: translateY(-5px);
}
</style>