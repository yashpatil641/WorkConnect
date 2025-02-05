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
  <div class="min-h-screen bg-primary">
    <!-- Hero Section with reduced padding -->
    <div class="bg-gradient-to-b from-green-900/20 to-transparent py-10 px-4">
      <div class="max-w-3xl mx-auto text-center mt-16">
        <h1 class="text-3xl font-bold text-green-500 mb-3 animate-fade-in">
          Manage Your Job Listings
        </h1>
        <RouterLink 
          to="/jobs/add"
          class="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-4 py-1.5 text-sm rounded-lg transition-colors duration-300 mb-6 mt-6"
        >
          Post New Job
        </RouterLink>
        
        <!-- Compact Search and Filter -->
        <div class="flex flex-col md:flex-row gap-3 justify-center items-center ">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search your listings..."
            class="w-full md:w-72 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
          <select 
            v-model="selectedType"
            class="w-full md:w-36 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            <option v-for="type in jobTypes" :key="type" :value="type">
              {{ type.replace('_', ' ') }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Compact Jobs Grid -->
    <div class="container mx-auto px-3 py-6">
      <div v-if="state.isLoading" class="flex justify-center items-center py-8">
        <PulseLoader color="#22c55e" size="8px" />
      </div>
      
      <TransitionGroup 
        name="job-list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
           class="text-center py-8 animate-fade-in">
        <div class="bg-white/10 rounded-lg p-6 max-w-sm mx-auto">
          <h3 class="text-lg text-white mb-2">No Jobs Posted Yet</h3>
          <p class="text-green-400 mb-3 text-sm">Start by posting your first job listing</p>
          <RouterLink 
            to="/jobs/add"
            class="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 text-sm rounded-lg transition-colors duration-300"
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