<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  job: Object,
});

const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  let description = props.job.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...';
  }
  return description;
});
</script>

<template>
  <RouterLink :to="'/jobs/' + job.id">
      <div
        class="group bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 text-white rounded-xl shadow-lg relative poppins-regular border border-white/5 transition-all duration-400 hover:shadow-xl min-h-64">
        <div class="p-4">
          <!-- Job Type Badge -->
          <div class="absolute -top-3 right-4"> 
            <span class="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20">
              {{ job.type.replace('_', ' ') }}
            </span>
          </div>

          <!-- Title Section -->
          <div class="mb-4 mt-2">
            <h3 class="text-lg font-semibold group-hover:text-green-400 transition-colors duration-300">
              {{ job.title }}
            </h3>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <p class="text-white/70 text-sm leading-relaxed">
              {{ truncatedDescription }}
            </p>
            <button @click="toggleFullDescription"
              class="text-green-400 hover:text-green-300 text-xs mt-2 focus:outline-none transition-colors duration-300">
              {{ showFullDescription ? 'Show Less' : 'Read More' }}
            </button>
          </div>

          <!-- Salary -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-white/60 text-sm">Salary:</span>
            <span class="text-green-400 font-medium text-sm">{{ job.salary }} / Year</span>
          </div>

          <!-- Divider -->
          <div class="h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent mb-4"></div>

          <!-- Footer -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-white/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm">{{ job.location }}</span>
            </div>

            <RouterLink :to="'/jobs/' + job.id"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-500 hover:to-green-600 text-white text-sm px-4 py-1.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </RouterLink>
</template>

<style scoped>
.group:hover {
  transform: translateY(-2px);
}
</style>