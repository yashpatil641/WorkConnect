<script setup>
import { ref, onMounted, computed } from 'vue';
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
    jobs.value = [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          type: 'FULL_TIME',
          location: 'San Francisco, CA (Remote)',
          description: 'We are looking for an experienced Frontend Developer proficient in Vue.js to join our growing team.',
          company: {
            name: 'TechVision Inc.',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$120,000 - $150,000',
          skills: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Git'],
          postedDate: '2025-03-15'
        },
        {
          id: '2',
          title: 'UX Designer',
          type: 'FULL_TIME',
          location: 'New York, NY',
          description: 'Join our creative team to design beautiful and intuitive user experiences for our product suite.',
          company: {
            name: 'CreativeMinds',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$90,000 - $120,000',
          skills: ['Figma', 'Adobe XD', 'User Testing', 'Wireframing'],
          postedDate: '2025-03-18'
        },
        {
          id: '3',
          title: 'Data Scientist',
          type: 'FULL_TIME',
          location: 'Remote',
          description: 'Looking for a data scientist to help us analyze user data and create predictive models.',
          company: {
            name: 'DataFlow Systems',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$130,000 - $160,000',
          skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'],
          postedDate: '2025-03-20'
        },
        {
          id: '4',
          title: 'Product Manager',
          type: 'FULL_TIME',
          location: 'Seattle, WA',
          description: 'Lead product development for our flagship software solution.',
          company: {
            name: 'InnovateTech',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$115,000 - $145,000',
          skills: ['Agile', 'Product Strategy', 'User Research', 'Roadmapping'],
          postedDate: '2025-03-22'
        },
        {
          id: '5',
          title: 'React Native Developer',
          type: 'REMOTE',
          location: 'Remote (US-based)',
          description: 'Join our mobile team to develop cross-platform applications using React Native.',
          company: {
            name: 'AppCreators',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$110,000 - $140,000',
          skills: ['React Native', 'JavaScript', 'TypeScript', 'Mobile Development'],
          postedDate: '2025-03-25'
        },
        {
          id: '6',
          title: 'Backend Engineer',
          type: 'FULL_TIME',
          location: 'Austin, TX',
          description: 'Design and build scalable APIs and services for our growing platform.',
          company: {
            name: 'ServerStack',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$125,000 - $155,000',
          skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
          postedDate: '2025-03-26'
        },
        {
          id: '7',
          title: 'DevOps Engineer',
          type: 'FULL_TIME',
          location: 'Chicago, IL',
          description: 'Manage our cloud infrastructure and implement CI/CD pipelines.',
          company: {
            name: 'CloudNine',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$130,000 - $160,000',
          skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
          postedDate: '2025-03-28'
        },
        {
          id: '8',
          title: 'Marketing Intern',
          type: 'INTERNSHIP',
          location: 'Boston, MA',
          description: 'Support our marketing team with campaigns, social media, and content creation.',
          company: {
            name: 'GrowthPartners',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$25 - $30 / hour',
          skills: ['Social Media', 'Content Writing', 'Marketing Analytics', 'Photoshop'],
          postedDate: '2025-03-30'
        },
        {
          id: '9',
          title: 'Technical Support Specialist',
          type: 'PART_TIME',
          location: 'Denver, CO',
          description: 'Provide technical support to our customers and help troubleshoot software issues.',
          company: {
            name: 'SupportHero',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$30 - $40 / hour',
          skills: ['Customer Service', 'Technical Support', 'Problem Solving', 'Communication'],
          postedDate: '2025-04-01'
        },
        {
          id: '10',
          title: 'QA Engineer',
          type: 'FULL_TIME',
          location: 'Portland, OR',
          description: 'Ensure software quality through automated and manual testing.',
          company: {
            name: 'QualityFirst',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$95,000 - $120,000',
          skills: ['Selenium', 'Jest', 'CI/CD', 'Test Planning'],
          postedDate: '2025-04-03'
        },
        {
          id: '11',
          title: 'Blockchain Developer',
          type: 'REMOTE',
          location: 'Remote (Worldwide)',
          description: 'Develop blockchain solutions for our financial technology platform.',
          company: {
            name: 'ChainWorks',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$140,000 - $180,000',
          skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js'],
          postedDate: '2025-04-05'
        },
        {
          id: '12',
          title: 'Technical Writer',
          type: 'PART_TIME',
          location: 'Remote (US-based)',
          description: 'Create documentation for our APIs, features, and software products.',
          company: {
            name: 'DocuWorks',
            logo: 'https://via.placeholder.com/150',
            website: 'https://example.com'
          },
          salary: '$40 - $55 / hour',
          skills: ['Technical Writing', 'Markdown', 'Documentation Tools', 'API Knowledge'],
          postedDate: '2025-04-07'
        }
      ]
      


  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 ">
    <div class=" py-10 px-4">
      <div class="max-w-3xl mx-auto text-center mt-16">
        <h1 class="text-3xl font-bold text-green-500 mb-3 animate-fade-in">
          Find Your Next Opportunity
        </h1>
        <div class="flex flex-col md:flex-row gap-3 justify-center items-center mt-6">
          <input v-model="searchQuery" type="text" placeholder="Search jobs or companies..."
            class="w-full md:w-72 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300">
          <select v-model="selectedType"
            class="w-full md:w-36 px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-green-500/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300">
            <option v-for="type in jobTypes" :key="type" :value="type" class=" border-none text-sm">
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

      <TransitionGroup name="job-list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <JobListing v-for="job in filteredJobs" :key="job.id" :job="job" class="job-item" />
      </TransitionGroup>

      <div v-if="!isLoading && filteredJobs.length === 0" class="text-center py-8 animate-fade-in">
        <div class="bg-white/10 rounded-lg p-6 max-w-sm mx-auto">
          <h3 class="text-lg text-white mb-2">No Jobs Found</h3>
          <p class="text-green-400 text-sm">Try adjusting your search criteria</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Minimalistic bluish-green to black gradient */


/* Single subtle glow effect for visual interest */
.header-gradient::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -10%;
  width: 120%;
  height: 200px;
  background: radial-gradient(ellipse, rgba(20, 184, 166, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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