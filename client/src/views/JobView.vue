<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

import { SignUpButton, UserButton, useUser, useAuth, SignOutButton, SignInButton } from '@clerk/vue';
import { ref, watchEffect } from 'vue';
const { isLoaded, user, isSignedIn } = useUser();
const userid = ref(null);
watchEffect(() => {
  if (isLoaded && user?.value) {
    userid.value = user.value.id;
    console.log("useridfromclerk", userid.value)
  }
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;
const { getToken } = useAuth();

const state = reactive({
  job: {},
  isLoading: true,
});

const deleteJob = async () => {
  try {
    const token = await getToken.value();

    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (confirm) {
      await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Job Deleted Successfully');
      router.push('/myjobs');
    }
  } catch (error) {
    console.error('Error deleting job', error);
    toast.error('Job Not Deleted');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${jobId}`);
    state.job = response.data;
    console.log("USerr if from backend", state.job.userId)
  } catch (error) {
    console.error('Error fetching job', error);
    // This is a mock data function that returns different data based on the jobId
      const sampleJobs = {
        '1': {
          id: '1',
          title: 'Senior Frontend Developer',
          type: 'FULL_TIME',
          location: 'San Francisco, CA (Remote)',
          description: 'We are looking for an experienced Frontend Developer proficient in Vue.js to join our growing team. As a Senior Frontend Developer, you will be responsible for building user interfaces, implementing new features, and ensuring the overall performance and scalability of our web applications.\n\nYou will work closely with our design and backend teams to create seamless, responsive experiences for our users. The ideal candidate has strong experience with modern JavaScript frameworks, particularly Vue.js, and a solid understanding of web fundamentals.',
          company: {
            name: 'TechVision Inc.',
            logo: 'https://via.placeholder.com/150',
            website: 'https://techvision.example.com',
            description: 'TechVision is a leading software company specializing in AI-driven solutions for enterprise clients. Founded in 2015, we have grown to over 200 employees across 5 offices worldwide.',
            contactEmail: 'careers@techvision.example.com',
            contactPhone: '+1 (555) 123-4567'
          },
          userId: '123456', // This would match the user's ID if they are the job creator
          salary: '$120,000 - $150,000',
          skills: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Git'],
          postedDate: '2025-03-15'
        },
        '2': {
          id: '2',
          title: 'UX Designer',
          type: 'FULL_TIME',
          location: 'New York, NY',
          description: 'Join our creative team to design beautiful and intuitive user experiences for our product suite. Were looking for a talented UX Designer who is passionate about creating user- centered designs that solve real problems.\n\nYou will conduct user research, create wireframes and prototypes, and collaborate with our development team to implement your designs.The ideal candidate is familiar with design thinking methodologies and has experience with modern design tools.',
            company: {
          name: 'CreativeMinds',
          logo: 'https://via.placeholder.com/150',
          website: 'https://creativeminds.example.com',
          description: 'CreativeMinds is a digital design agency that helps startups and established companies create memorable brand experiences. Our team of designers and developers work together to deliver exceptional digital products.',
          contactEmail: 'jobs@creativeminds.example.com',
          contactPhone: '+1 (555) 987-6543'
            },
        userId: '234567',
        salary: '$90,000 - $120,000',
        skills: ['Figma', 'Adobe XD', 'User Testing', 'Wireframing'],
        postedDate: '2025-03-18'
    },
    '3': {
      id: '3',
        title: 'Data Scientist',
          type: 'FULL_TIME',
            location: 'Remote',
              description: 'Looking for a data scientist to help us analyze user data and create predictive models. As our Data Scientist, you will work with large datasets to derive insights and build machine learning models that drive business decisions.\n\nYou will collaborate with our product and engineering teams to implement data-driven features and optimize existing algorithms. The ideal candidate has strong analytical skills, experience with statistical analysis, and proficiency in Python.',
                company: {
        name: 'DataFlow Systems',
          logo: 'https://via.placeholder.com/150',
            website: 'https://dataflow.example.com',
              description: 'DataFlow Systems specializes in big data analytics and machine learning solutions for various industries. We help companies leverage their data to make better decisions and drive growth.',
                contactEmail: 'hiring@dataflow.example.com',
                  contactPhone: '+1 (555) 456-7890'
      },
      userId: userid.value, // This will match the current user's ID so they can edit/delete it
        salary: '$130,000 - $160,000',
          skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'],
            postedDate: '2025-03-20'
    },
    '4': {
      id: '4',
        title: 'Product Manager',
          type: 'FULL_TIME',
            location: 'Seattle, WA',
              description: 'Lead product development for our flagship software solution. As a Product Manager, you will be responsible for defining product strategy, creating roadmaps, and working with cross-functional teams to deliver features that meet user needs.\n\nYou will conduct market research, gather and prioritize requirements, and ensure that our products deliver an exceptional user experience. The ideal candidate has a track record of successful product launches and strong communication skills.',
                company: {
        name: 'InnovateTech',
          logo: 'https://via.placeholder.com/150',
            website: 'https://innovatetech.example.com',
              description: 'InnovateTech creates enterprise software solutions that help businesses streamline their operations and improve productivity. Our suite of products serves clients in various sectors, from finance to healthcare.',
                contactEmail: 'recruiting@innovatetech.example.com',
                  contactPhone: '+1 (555) 234-5678'
      },
      userId: '456789',
        salary: '$115,000 - $145,000',
          skills: ['Agile', 'Product Strategy', 'User Research', 'Roadmapping'],
            postedDate: '2025-03-22'
    },
    '5': {
      id: '5',
        title: 'React Native Developer',
          type: 'REMOTE',
            location: 'Remote (US-based)',
              description: 'Join our mobile team to develop cross-platform applications using React Native. As a React Native Developer, you will be responsible for building and maintaining mobile applications that work smoothly on both iOS and Android platforms.\n\nYou will collaborate with our design and backend teams to implement new features and ensure the overall performance of our mobile apps. The ideal candidate has experience with React Native, JavaScript, and mobile app development principles.',
                company: {
        name: 'AppCreators',
          logo: 'https://via.placeholder.com/150',
            website: 'https://appcreators.example.com',
              description: 'AppCreators is a mobile-first development studio that builds innovative applications for startups and enterprises. Our team specializes in creating seamless mobile experiences across multiple platforms.',
                contactEmail: 'talent@appcreators.example.com',
                  contactPhone: '+1 (555) 345-6789'
      },
      userId: '567890',
        salary: '$110,000 - $140,000',
          skills: ['React Native', 'JavaScript', 'TypeScript', 'Mobile Development'],
            postedDate: '2025-03-25'
    }
  };

  // Use the sample job data for the requested jobId, or default to the first one
  state.job = sampleJobs[jobId] || sampleJobs['1'];
    
  } finally {
  state.isLoading = false;
}
});
</script>
<template>
  <div class="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-10 pt-16">
    <BackButton />
    <section v-if="!state.isLoading" class="poppins-regular min-h-screen text-white">
      <div class="container m-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <!-- Main Content Column -->
          <main>
            <!-- Job Header -->
            <div class="bg-white/10 p-8 rounded-xl shadow-lg text-center md:text-left backdrop-blur-sm border border-white/5 hover:border-green-500/20 transition-all duration-300">
              <div class="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-4">
                {{ state.job.type.replace('_', ' ') }}
              </div>
              <h1 class="text-4xl font-bold mb-4 text-white">{{ state.job.title }}</h1>
              <div class="flex items-center justify-center md:justify-start gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-gray-300">{{ state.job.location }}</p>
              </div>
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 border-t border-white/10">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-300 text-sm">Posted on {{ new Date(state.job.postedDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) }}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-green-400 font-medium">{{ state.job.salary }}</span>
                </div>
              </div>
            </div>

            <!-- Job Description -->
            <div class="bg-white/10 p-8 rounded-xl shadow-lg mt-6 backdrop-blur-sm border border-white/5">
              <h3 class="text-green-500 text-xl font-bold mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Job Description
              </h3>

              <p class="mb-6 text-gray-300 leading-relaxed whitespace-pre-line">
                {{ state.job.description }}
              </p>

              <!-- Required Skills -->
              <div class="mt-8" v-if="state.job.skills && state.job.skills.length > 0">
                <h3 class="text-green-500 text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Required Skills
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(skill, index) in state.job.skills" :key="index"
                        class="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                    {{ skill }}
                  </span>
                </div>
              </div>

              <!-- Compensation -->
              <div class="mt-8 p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                <h3 class="text-green-500 text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Compensation
                </h3>
                <p class="text-white text-lg font-medium">{{ state.job.salary }} <span class="text-gray-400 text-base font-normal">per year</span></p>
              </div>
            </div>
          </main>

          <!-- Sidebar Column -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/5 hover:border-green-500/20 transition-all duration-300">
              <h3 class="text-xl font-bold mb-6 text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company Info
              </h3>

              <div class="flex items-center mb-4">
                <div class="w-14 h-14 rounded-lg overflow-hidden bg-white/10 mr-4 flex items-center justify-center">
                  <img v-if="state.job.company.logo" :src="state.job.company.logo" alt="Company logo" class="w-full h-full object-cover" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ state.job.company.name }}</h2>
              </div>

              <p class="my-4 text-gray-300 leading-relaxed">
                {{ state.job.company.description }}
              </p>

              <div v-if="state.job.company.website" class="my-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a :href="state.job.company.website" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors underline">
                  {{ state.job.company.website.replace('https://', '') }}
                </a>
              </div>

              <hr class="my-6 border-white/10" />

              <!-- Contact Information -->
              <div>
                <h4 class="text-lg font-medium text-green-500 mb-4">Contact Information</h4>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-400 mb-1">Email</p>
                      <p class="text-white font-medium">{{ state.job.company.contactEmail }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-400 mb-1">Phone</p>
                      <p class="text-white font-medium">{{ state.job.company.contactPhone }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Apply/Manage Job -->
            <div class="bg-white/10 p-8 rounded-xl shadow-lg mt-6 backdrop-blur-sm border border-white/5">
              <div v-if="userid !== state.job.userId">
                <p class="text-gray-400 mb-4">Ready to apply for this position? Click below to submit your application.</p>
                <RouterLink :to="`/jobs/apply/${state.job.id}`"
                  class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-center font-bold py-3 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Apply for this Job
                </RouterLink>
              </div>
              <div v-else>
                <h3 class="text-xl font-bold mb-4 text-white">Manage Job</h3>
                <p class="text-gray-400 mb-4">This is your listing. You can edit or delete it.</p>
                <div class="space-y-3">
                  <RouterLink :to="`/jobs/edit/${state.job.id}`"
                    class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Job
                  </RouterLink>
                  <button @click="deleteJob"
                    class="bg-red-500/80 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Share job -->
            <div class="bg-white/10 p-6 rounded-xl shadow-lg mt-6 backdrop-blur-sm border border-white/5 text-center">
              <p class="text-gray-400 mb-3 text-sm">Share this job opportunity</p>
              <div class="flex justify-center space-x-4">
                <button class="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-full transition-colors" title="Share on LinkedIn">
                  <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button class="p-2 bg-blue-400/20 hover:bg-blue-400/40 rounded-full transition-colors" title="Share on Twitter">
                  <svg class="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="p-2 bg-green-500/20 hover:bg-green-500/40 rounded-full transition-colors" title="Share via Email">
                  <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <div v-else class="flex justify-center items-center h-screen">
      <PulseLoader color="#22c55e" size="10px" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.poppins-regular {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.md\:grid-cols-70\/30 {
  grid-template-columns: 70% 30%;
}

/* Improved styling for pre-formatted text */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>