<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuth, useUser } from '@clerk/vue';
import axios from 'axios';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { isSignedIn, getToken } = useAuth();
const { user } = useUser();

const jobId = route.params.id;
const state = reactive({
  job: null,
  isLoading: true,
  isSubmitting: false
});

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  coverLetter: '',
  resumeLink: '',
  linkedinProfile: '',
  portfolioUrl: '',
  currentPosition: '',
  availability: 'Immediate',
  salaryExpectation: '',
  useExistingResume: true // Default to using existing resume
});

// Resume file handling
const resumeFile = ref(null);
const resumeFileName = ref('');
const existingResumeUrl = ref('');
const existingResumeName = ref('MyResume.pdf'); // Mock existing resume name

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    resumeFile.value = file;
    resumeFileName.value = file.name;
    form.useExistingResume = false; // Switch to using newly uploaded resume
  }
};

const toggleResumeOption = () => {
  form.useExistingResume = !form.useExistingResume;
  if (form.useExistingResume && resumeFile.value) {
    resumeFile.value = null;
    resumeFileName.value = '';
  }
};

const availabilityOptions = [
  'Immediate',
  '2 weeks',
  '1 month',
  '2+ months'
];

const handleSubmit = async () => {
  if (!isSignedIn.value) {
    toast.error('Please sign in to apply for jobs');
    return;
  }

  try {
    state.isSubmitting = true;
    const token = await getToken.value();
    
    // Here you would handle the file upload and form submission
    // For now, we'll simulate it with a timeout
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('userId', user.value.id);
    formData.append('fullName', form.fullName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('coverLetter', form.coverLetter);
    formData.append('resumeLink', form.resumeLink);
    formData.append('linkedinProfile', form.linkedinProfile);
    formData.append('portfolioUrl', form.portfolioUrl);
    formData.append('currentPosition', form.currentPosition);
    formData.append('availability', form.availability);
    formData.append('salaryExpectation', form.salaryExpectation);
    formData.append('useExistingResume', form.useExistingResume);
    
    // Only append resume file if user is uploading a new one
    if (!form.useExistingResume && resumeFile.value) {
      formData.append('resume', resumeFile.value);
    }
    
    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Application submitted successfully');
    router.push('/applications');
  } catch (error) {
    console.error('Error submitting application:', error);
    toast.error('Failed to submit application');
  } finally {
    state.isSubmitting = false;
  }
};

onMounted(async () => {
  try {
    // Mock job details instead of API call
    state.job = {
      id: 'job-123',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our team.',
      location: 'San Francisco, CA (Remote)',
      salary: '$120,000 - $150,000',
      company: {
        name: 'TechVision Inc.',
        logo: 'https://via.placeholder.com/150',
        website: 'https://techvision.example.com'
      },
      jobType: 'Full-time',
      skills: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Git'],
      postedDate: '2025-03-25',
      deadline: '2025-04-30'
    };
    
    // Pre-fill form with user data if available
    if (user.value) {
      // Basic information
      form.fullName = user.value.firstName ? `${user.value.firstName} ${user.value.lastName || ''}` : '';
      form.email = user.value.emailAddresses?.[0]?.emailAddress || '';
      
      // Additional profile information (in a real app, these would come from the user profile)
      form.phone = '+1 (555) 123-4567'; // Mock data, in real app would be user.value.phoneNumber
      form.currentPosition = 'Frontend Developer'; // Mock data, in real app would be user.value.currentPosition
      form.linkedinProfile = 'https://linkedin.com/in/yourprofile'; // Mock data
      form.portfolioUrl = 'https://yourportfolio.com'; // Mock data
      form.salaryExpectation = '$120,000 - $140,000'; // Mock data
      
      // Mock existing resume data from user profile
      existingResumeUrl.value = '#'; // In real app, this would be the actual URL
      existingResumeName.value = 'YourResume.pdf'; // In real app, get from user profile
    }
  } catch (error) {
    console.error('Error setting up mock data:', error);
    toast.error('Failed to load job details');
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-10 pt-16">
    <BackButton />
    
    <div class="container mx-auto max-w-4xl px-4 mt-10">
      <div v-if="state.isLoading" class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
      
      <div v-else class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <!-- Header -->
        <div class="mb-10 text-center">
          <h1 class="text-3xl font-bold text-green-500 mb-2">Apply for Position</h1>
          <h2 class="text-xl text-white mb-2">{{ state.job.title }}</h2>
          <p class="text-gray-400">{{ state.job.company.name }} • {{ state.job.location }}</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Personal Information -->
          <div>
            <h3 class="text-xl font-semibold text-green-400 mb-5">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Full Name</label>
                <input
                  v-model="form.fullName"
                  type="text"
                  placeholder="Your full name"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Your email address"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Your phone number"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Current Position</label>
                <input
                  v-model="form.currentPosition"
                  type="text"
                  placeholder="Your current job title"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Application Details -->
          <div>
            <h3 class="text-xl font-semibold text-green-400 mb-5">Application Details</h3>
            
            <div class="mb-6">
              <label class="block text-sm font-medium text-green-400 mb-2">Cover Letter</label>
              <textarea
                v-model="form.coverLetter"
                rows="6"
                placeholder="Tell us why you're a good fit for this position..."
                class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                required
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Resume</label>
                <div class="flex flex-col space-y-4">
                  <!-- Use existing resume option -->
                  <div class="flex items-start">
                    <input 
                      type="radio" 
                      id="useExisting" 
                      name="resumeOption" 
                      :checked="form.useExistingResume" 
                      @change="toggleResumeOption"
                      class="mt-1 h-4 w-4 text-green-500 focus:ring-green-400" 
                    />
                    <div class="ml-3">
                      <label for="useExisting" class="text-white text-sm font-medium">Use profile resume</label>
                      <p class="text-gray-400 text-xs mt-1">Your profile resume ({{ existingResumeName }}) will be used for this application</p>
                    </div>
                  </div>
                  
                  <!-- Upload new resume option -->
                  <div class="flex items-start">
                    <input 
                      type="radio" 
                      id="uploadNew" 
                      name="resumeOption" 
                      :checked="!form.useExistingResume" 
                      @change="toggleResumeOption"
                      class="mt-1 h-4 w-4 text-green-500 focus:ring-green-400"
                    />
                    <div class="ml-3 flex-1">
                      <label for="uploadNew" class="text-white text-sm font-medium">Upload different resume</label>
                      <div v-if="!form.useExistingResume" class="mt-2">
                        <div class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white">
                          <input
                            type="file"
                            id="resume"
                            @change="handleResumeUpload"
                            accept=".pdf,.doc,.docx"
                            class="hidden"
                          />
                          <label for="resume" class="cursor-pointer flex items-center justify-center gap-2 text-green-400 hover:text-green-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            {{ resumeFileName || 'Click to upload' }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">LinkedIn Profile</label>
                <input
                  v-model="form.linkedinProfile"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Portfolio/Website</label>
                <input
                  v-model="form.portfolioUrl"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Availability</label>
                <select
                  v-model="form.availability"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                >
                  <option v-for="option in availabilityOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Salary Expectation</label>
                <input
                  v-model="form.salaryExpectation"
                  type="text"
                  placeholder="e.g. $50,000 - $60,000"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="flex justify-center pt-6">
            <button
              type="submit"
              class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-12 rounded-lg transition-all duration-300 flex items-center space-x-2"
              :disabled="state.isSubmitting"
            >
              <span v-if="state.isSubmitting">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span>{{ state.isSubmitting ? 'Submitting...' : 'Submit Application' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styles */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2322c55e' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
</style>