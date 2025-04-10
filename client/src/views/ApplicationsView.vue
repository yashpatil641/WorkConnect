<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuth, useUser } from '@clerk/vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = useRouter();
const toast = useToast();
const { isSignedIn, getToken } = useAuth();
const { user } = useUser();

// Filter controls
const searchQuery = ref('');
const selectedStatus = ref('ALL');

const statusOptions = [
  'ALL', 
  'PENDING', 
  'REVIEWING', 
  'INTERVIEW', 
  'ACCEPTED', 
  'REJECTED'
];

const statusColors = {
  'PENDING': 'yellow',
  'REVIEWING': 'blue',
  'INTERVIEW': 'purple',
  'ACCEPTED': 'green',
  'REJECTED': 'red'
};

const state = reactive({
  applications: [],
  isLoading: true
});

const filteredApplications = computed(() => {
  return state.applications.filter(app => {
    const matchesSearch = 
      app.job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      app.job.company.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesStatus = selectedStatus.value === 'ALL' || app.status === selectedStatus.value;
    
    return matchesSearch && matchesStatus;
  });
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusClass = (status) => {
  const color = statusColors[status] || 'gray';
  return {
    bg: `bg-${color}-500/20`,
    text: `text-${color}-400`,
    border: `border-${color}-500/20`
  };
};

onMounted(async () => {
  // if (!isSignedIn.value) {
  //   toast.error('Please sign in to view your applications');
  //   router.push('/signin');
  //   return;
  // }

  try {
    // In a real app, fetch from API
    // const token = await getToken.value();
    // const response = await axios.get('http://127.0.0.1:8000/api/applications', {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // state.applications = response.data;
    
    // Mock data for the UI
    state.applications = [
      {
        id: 'app-1',
        status: 'PENDING',
        appliedDate: '2025-04-05',
        updatedDate: '2025-04-05',
        coverLetter: 'I am excited to apply for this position...',
        resumeUrl: '#',
        job: {
          id: 'job-123',
          title: 'Senior Frontend Developer',
          type: 'FULL_TIME',
          location: 'San Francisco, CA (Remote)',
          company: {
            name: 'TechVision Inc.',
            logo: 'https://via.placeholder.com/40'
          }
        }
      },
      {
        id: 'app-2',
        status: 'REVIEWING',
        appliedDate: '2025-04-01',
        updatedDate: '2025-04-03',
        coverLetter: 'I believe my skills align perfectly with...',
        resumeUrl: '#',
        job: {
          id: 'job-124',
          title: 'UX Designer',
          type: 'FULL_TIME',
          location: 'New York, NY',
          company: {
            name: 'CreativeMinds',
            logo: 'https://via.placeholder.com/40'
          }
        }
      },
      {
        id: 'app-3',
        status: 'INTERVIEW',
        appliedDate: '2025-03-25',
        updatedDate: '2025-04-07',
        coverLetter: 'With my background in backend development...',
        resumeUrl: '#',
        job: {
          id: 'job-125',
          title: 'Backend Developer',
          type: 'PART_TIME',
          location: 'Austin, TX (Hybrid)',
          company: {
            name: 'DataFlow Systems',
            logo: 'https://via.placeholder.com/40'
          }
        }
      },
      {
        id: 'app-4',
        status: 'ACCEPTED',
        appliedDate: '2025-03-15',
        updatedDate: '2025-04-09',
        coverLetter: 'I have extensive experience with cloud infrastructure...',
        resumeUrl: '#',
        job: {
          id: 'job-126',
          title: 'DevOps Engineer',
          type: 'FULL_TIME',
          location: 'Remote',
          company: {
            name: 'CloudNine',
            logo: 'https://via.placeholder.com/40'
          }
        }
      },
      {
        id: 'app-5',
        status: 'REJECTED',
        appliedDate: '2025-03-10',
        updatedDate: '2025-03-20',
        coverLetter: 'My expertise in product management...',
        resumeUrl: '#',
        job: {
          id: 'job-127',
          title: 'Product Manager',
          type: 'FULL_TIME',
          location: 'Seattle, WA',
          company: {
            name: 'InnovateTech',
            logo: 'https://via.placeholder.com/40'
          }
        }
      }
    ];
  } catch (error) {
    console.error('Error fetching applications:', error);
    toast.error('Failed to load your applications');
  } finally {
    state.isLoading = false;
  }
});

// View application details
const viewApplication = (applicationId) => {
  router.push(`/applications/${applicationId}`);
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 ">
    <!-- Header Section -->
    <div class="py-10 px-4">
      <div class="max-w-5xl mx-auto text-center mt-16">
        <h1 class="text-3xl font-bold text-green-500 mb-3 animate-fade-in">
          My Applications
        </h1>
        <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
          Track the status of your job applications and monitor your interview progress
        </p>
        
        <!-- Search and Filter -->
        <div class="flex flex-col md:flex-row gap-3 justify-center items-center mt-8">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search jobs or companies..."
            class="w-full md:w-72 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
          <select 
            v-model="selectedStatus"
            class="w-full md:w-40 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ status.replace('_', ' ') }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Applications List -->
    <div class="container mx-auto px-4 py-10">
      <!-- Loading State -->
      <div v-if="state.isLoading" class="flex justify-center items-center py-20">
        <PulseLoader color="#22c55e" size="8px" />
      </div>
      
      <!-- Empty State -->
      <div v-else-if="state.applications.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="bg-white/10 rounded-xl p-8 max-w-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
          <p class="text-gray-400 mb-6">You haven't applied to any jobs yet. Start exploring opportunities!</p>
          <router-link 
            to="/alljobs" 
            class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Browse Jobs
          </router-link>
        </div>
      </div>
      
      <!-- No Results -->
      <div v-else-if="filteredApplications.length === 0" class="flex justify-center py-20">
        <div class="bg-white/10 rounded-xl p-8 max-w-md text-center">
          <h3 class="text-xl font-semibold text-white mb-2">No Matching Applications</h3>
          <p class="text-gray-400">Try adjusting your search criteria</p>
        </div>
      </div>

      <!-- Applications Table -->
      <div v-else class="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <table class="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-green-400">Job</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-green-400 hidden md:table-cell">Date Applied</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-green-400">Status</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-green-400 hidden lg:table-cell">Last Updated</th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-for="application in filteredApplications" :key="application.id" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center overflow-hidden mr-3">
                    <img :src="application.job.company.logo" alt="Company logo" class="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-white">{{ application.job.title }}</div>
                    <div class="text-xs text-gray-400">{{ application.job.company.name }}</div>
                    <div class="text-xs text-gray-500 mt-1">{{ application.job.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div class="text-sm text-gray-300">{{ formatDate(application.appliedDate) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold border',
                    `bg-${statusColors[application.status]}-500/20`,
                    `text-${statusColors[application.status]}-400`,
                    `border-${statusColors[application.status]}-500/30`
                  ]"
                >
                  {{ application.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                {{ formatDate(application.updatedDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="viewApplication(application.id)" 
                  class="text-green-400 hover:text-green-500 transition-colors duration-200"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add Tailwind utility classes to handle status colors properly */
.bg-green-500\/20 { background-color: rgba(34, 197, 94, 0.2); }
.bg-yellow-500\/20 { background-color: rgba(234, 179, 8, 0.2); }
.bg-blue-500\/20 { background-color: rgba(59, 130, 246, 0.2); }
.bg-purple-500\/20 { background-color: rgba(168, 85, 247, 0.2); }
.bg-red-500\/20 { background-color: rgba(239, 68, 68, 0.2); }

.text-green-400 { color: rgba(74, 222, 128, 1); }
.text-yellow-400 { color: rgba(250, 204, 21, 1); }
.text-blue-400 { color: rgba(96, 165, 250, 1); }
.text-purple-400 { color: rgba(192, 132, 252, 1); }
.text-red-400 { color: rgba(248, 113, 113, 1); }

.border-green-500\/30 { border-color: rgba(34, 197, 94, 0.3); }
.border-yellow-500\/30 { border-color: rgba(234, 179, 8, 0.3); }
.border-blue-500\/30 { border-color: rgba(59, 130, 246, 0.3); }
.border-purple-500\/30 { border-color: rgba(168, 85, 247, 0.3); }
.border-red-500\/30 { border-color: rgba(239, 68, 68, 0.3); }

/* Animation */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Table hover effect */
tr:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>