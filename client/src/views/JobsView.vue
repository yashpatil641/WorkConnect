<script setup>
import { ref, onMounted,computed } from 'vue';
import JobListing from '../components/JobListing.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

const jobs = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const selectedType = ref('ALL');

const jobTypes = ['ALL', 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'REMOTE'];

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === 'ALL' || job.type === selectedType.value;
    return matchesSearch && matchesType;
  });
});

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/jobs');
    jobs.value = response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <div class="bg-gradient-to-b from-green-900/20 to-transparent py-10 px-4">
      <div class="max-w-3xl mx-auto text-center mt-16">
        <h1 class="text-3xl font-bold text-green-500 mb-3 animate-fade-in">
          Find Your Next Opportunity
        </h1>
        <div class="flex flex-col md:flex-row gap-3 justify-center items-center mt-6">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search jobs or companies..."
            class="w-full md:w-72 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
          <select 
            v-model="selectedType"
            class="w-full md:w-36 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            <option v-for="type in jobTypes" :key="type" :value="type" class="bg-black/80 border-none text-sm">
              {{ type.replace('_', ' ') }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Jobs Grid -->
    <div class="container mx-auto px-3 py-6">
      <div v-if="isLoading" class="flex justify-center items-center py-8">
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
          class="job-item"
        />
      </TransitionGroup>

      <div v-if="!isLoading && filteredJobs.length === 0" 
           class="text-center py-8 animate-fade-in">
        <div class="bg-white/10 rounded-lg p-6 max-w-sm mx-auto">
          <h3 class="text-lg text-white mb-2">No Jobs Found</h3>
          <p class="text-green-400 text-sm">Try adjusting your search criteria</p>
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