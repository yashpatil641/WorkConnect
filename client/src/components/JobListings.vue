<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './JobListing.vue';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/jobs');
    state.jobs = response.data;
    console.log(response)
  } catch (error) {
    console.error('Error fetching jobs', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class=" px-20 py-10 pt-20">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center poppins-regular">
        Browse Jobs
      </h2>
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Add error state when no jobs -->
      <div v-else-if="!state.jobs.length" class="text-center py-10">
        <div class="bg-white/20 rounded-lg p-8 max-w-md mx-auto">
          <h3 class="text-xl text-white mb-2">No Jobs Found</h3>
          <p class="text-green-400">Check back later for new opportunities</p>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton && state.jobs.length" class="m-auto max-w-lg w-64 pb-10">
    <RouterLink to="/jobs"
      class="block bg-green-600 text-white font-medium text-lg text-center py-3 px-6 rounded-xl hover:bg-green-800">View All Jobs
    </RouterLink>
  </section>
</template>
