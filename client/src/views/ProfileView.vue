<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuth, useUser } from '@clerk/vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const toast = useToast();
const { isSignedIn, getToken } = useAuth();
const { user } = useUser();

const state = reactive({
  isLoading: true,
  isSubmitting: false,
  activeTab: 'personal',
  showSuccessMessage: false,
});

const tabs = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'professional', label: 'Professional Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'documents', label: 'Resume & Documents' },
];

// Form data
const profile = reactive({
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    birthday: '',
    bio: '',
    title: '',
    linkedin: '',
    github: '',
    website: '',
  },
  professional: {
    experiences: [
      { 
        company: '', 
        position: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        current: false,
        description: '' 
      }
    ]
  },
  education: {
    schools: [
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]
  },
  skills: {
    technicalSkills: [],
    softSkills: [],
    languages: [],
    certifications: []
  },
  documents: {
    hasResume: false,
    resumeName: '',
    resumeUrl: '',
    coverLetterTemplate: '',
  }
});

// Skills input handling
const newSkill = ref('');
const newSoftSkill = ref('');
const newLanguage = ref('');
const newCertification = ref('');

const addSkill = (type) => {
  let skillToAdd = '';
  
  switch(type) {
    case 'technical':
      skillToAdd = newSkill.value.trim();
      if (skillToAdd && !profile.skills.technicalSkills.includes(skillToAdd)) {
        profile.skills.technicalSkills.push(skillToAdd);
      }
      newSkill.value = '';
      break;
    case 'soft':
      skillToAdd = newSoftSkill.value.trim();
      if (skillToAdd && !profile.skills.softSkills.includes(skillToAdd)) {
        profile.skills.softSkills.push(skillToAdd);
      }
      newSoftSkill.value = '';
      break;
    case 'language':
      skillToAdd = newLanguage.value.trim();
      if (skillToAdd && !profile.skills.languages.includes(skillToAdd)) {
        profile.skills.languages.push(skillToAdd);
      }
      newLanguage.value = '';
      break;
    case 'certification':
      skillToAdd = newCertification.value.trim();
      if (skillToAdd && !profile.skills.certifications.includes(skillToAdd)) {
        profile.skills.certifications.push(skillToAdd);
      }
      newCertification.value = '';
      break;
  }
};

const removeSkill = (type, index) => {
  switch(type) {
    case 'technical':
      profile.skills.technicalSkills.splice(index, 1);
      break;
    case 'soft':
      profile.skills.softSkills.splice(index, 1);
      break;
    case 'language':
      profile.skills.languages.splice(index, 1);
      break;
    case 'certification':
      profile.skills.certifications.splice(index, 1);
      break;
  }
};

// Experience and education handling
const addExperience = () => {
  profile.professional.experiences.push({
    company: '', 
    position: '', 
    location: '', 
    startDate: '', 
    endDate: '', 
    current: false,
    description: ''
  });
};

const removeExperience = (index) => {
  profile.professional.experiences.splice(index, 1);
};

const addEducation = () => {
  profile.education.schools.push({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
};

const removeEducation = (index) => {
  profile.education.schools.splice(index, 1);
};

// Resume handling
const resumeFile = ref(null);
const resumeFileName = ref('');

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    resumeFile.value = file;
    resumeFileName.value = file.name;
  }
};

// Save profile
const saveProfile = async () => {
  if (!isSignedIn.value) {
    toast.error('Please sign in to save your profile');
    return;
  }

  try {
    state.isSubmitting = true;
    const token = await getToken.value();
    
    // Create form data with all profile information
    const formData = new FormData();
    formData.append('userId', user.value.id);
    formData.append('profile', JSON.stringify(profile));
    
    if (resumeFile.value) {
      formData.append('resume', resumeFile.value);
    }
    
    // In a real app, you would send this to your backend
    // await axios.post('http://127.0.0.1:8000/api/profiles', formData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    
    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Profile updated successfully');
    state.showSuccessMessage = true;
    setTimeout(() => {
      state.showSuccessMessage = false;
    }, 3000);
    
  } catch (error) {
    console.error('Error saving profile:', error);
    toast.error('Failed to update profile');
  } finally {
    state.isSubmitting = false;
  }
};

onMounted(async () => {
  try {
    if (!isSignedIn.value) {
      toast.error('Please sign in to view your profile');
      return;
    }
    
    // In a real app, fetch profile from API
    // const token = await getToken.value();
    // const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${user.value.id}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // populate profile data...
    
    // For now, populate with user data from Clerk
    if (user.value) {
      profile.personal.firstName = user.value.firstName || '';
      profile.personal.lastName = user.value.lastName || '';
      profile.personal.email = user.value.emailAddresses?.[0]?.emailAddress || '';
      
      // Add some mock data for demonstration
      profile.personal.title = 'Frontend Developer';
      profile.personal.phone = '+1 (555) 123-4567';
      profile.personal.location = 'San Francisco, CA';
      profile.skills.technicalSkills = ['JavaScript', 'Vue.js', 'CSS', 'HTML'];
      profile.skills.softSkills = ['Communication', 'Teamwork'];
      profile.skills.languages = ['English', 'Spanish'];
      
      // Mock resume
      profile.documents.hasResume = true;
      profile.documents.resumeName = 'MyResume.pdf';
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast.error('Failed to load profile data');
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-10">
    <div class="container mx-auto max-w-5xl px-4 pt-16">
      <!-- Loading Screen -->
      <div v-if="state.isLoading" class="flex justify-center items-center py-20">
        <PulseLoader color="#22c55e" size="8px" />
      </div>
      
      <div v-else class="space-y-8">
        <!-- Profile Header -->
        <div class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
          <div class="flex items-center mb-4">
            <div class="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-6">
              {{ profile.personal.firstName?.[0] || '' }}{{ profile.personal.lastName?.[0] || '' }}
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white">
                {{ profile.personal.firstName }} {{ profile.personal.lastName }}
              </h1>
              <p class="text-green-400 font-medium">{{ profile.personal.title || 'Add your professional title' }}</p>
              <p class="text-gray-400 text-sm mt-1">{{ profile.personal.location || 'Add your location' }}</p>
            </div>
          </div>
          
          <!-- Profile completeness -->
          <div class="mt-8">
            <div class="flex justify-between mb-2">
              <span class="text-gray-300 text-sm">Profile Completeness</span>
              <span class="text-green-400 text-sm">70%</span>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-green-500 to-green-600 h-full" style="width: 70%"></div>
            </div>
            <p class="text-gray-400 text-xs mt-2">Complete your profile to increase visibility to employers</p>
          </div>
        </div>
        
        <!-- Profile Navigation Tabs -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="state.activeTab = tab.id" 
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              state.activeTab === tab.id 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <!-- Success Message -->
        <div v-if="state.showSuccessMessage" class="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg animate-fade-in">
          Your profile has been updated successfully!
        </div>
        
        <!-- Profile Forms -->
        <form @submit.prevent="saveProfile">
          <!-- Personal Information Section -->
          <div v-show="state.activeTab === 'personal'" class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h2 class="text-xl font-semibold text-green-400 mb-6">Personal Information</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">First Name</label>
                <input
                  v-model="profile.personal.firstName"
                  type="text"
                  placeholder="Your first name"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Last Name</label>
                <input
                  v-model="profile.personal.lastName"
                  type="text"
                  placeholder="Your last name"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Professional Title</label>
                <input
                  v-model="profile.personal.title"
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Email</label>
                <input
                  v-model="profile.personal.email"
                  type="email"
                  placeholder="Your email address"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Phone</label>
                <input
                  v-model="profile.personal.phone"
                  type="tel"
                  placeholder="Your phone number"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Date of Birth</label>
                <input
                  v-model="profile.personal.birthday"
                  type="date"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Location</label>
                <input
                  v-model="profile.personal.location"
                  type="text"
                  placeholder="City, State, Country"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">LinkedIn</label>
                <input
                  v-model="profile.personal.linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">Website</label>
                <input
                  v-model="profile.personal.website"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-green-400 mb-2">GitHub</label>
                <input
                  v-model="profile.personal.github"
                  type="url"
                  placeholder="https://github.com/username"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-green-400 mb-2">Bio</label>
              <textarea
                v-model="profile.personal.bio"
                rows="4"
                placeholder="Tell us about yourself..."
                class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              ></textarea>
            </div>
          </div>
          
          <!-- Professional Experience Section -->
          <div v-show="state.activeTab === 'professional'" class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-green-400">Professional Experience</h2>
              <button 
                type="button"
                @click="addExperience" 
                class="text-sm px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                Add Experience
              </button>
            </div>
            
            <div v-for="(exp, index) in profile.professional.experiences" :key="index" class="mb-8 border-b border-white/10 pb-8">
              <div class="flex justify-between">
                <h3 class="text-lg font-semibold text-white">Experience {{ index + 1 }}</h3>
                <button 
                  v-if="profile.professional.experiences.length > 1"
                  type="button"
                  @click="removeExperience(index)" 
                  class="text-sm px-2 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                >
                  Remove
                </button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Company</label>
                  <input
                    v-model="exp.company"
                    type="text"
                    placeholder="Company name"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Job Title</label>
                  <input
                    v-model="exp.position"
                    type="text"
                    placeholder="Your position"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Location</label>
                  <input
                    v-model="exp.location"
                    type="text"
                    placeholder="City, Country or Remote"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Start Date</label>
                  <input
                    v-model="exp.startDate"
                    type="month"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div class="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="currentJob" 
                    v-model="exp.current"
                    class="h-4 w-4 rounded text-green-500 focus:ring-green-400"
                  >
                  <label for="currentJob" class="text-white text-sm">I currently work here</label>
                </div>
                
                <div v-if="!exp.current">
                  <label class="block text-sm font-medium text-green-400 mb-2">End Date</label>
                  <input
                    v-model="exp.endDate"
                    type="month"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div class="mt-4">
                <label class="block text-sm font-medium text-green-400 mb-2">Description</label>
                <textarea
                  v-model="exp.description"
                  rows="3"
                  placeholder="Describe your responsibilities and achievements..."
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- Education Section -->
          <div v-show="state.activeTab === 'education'" class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-green-400">Education</h2>
              <button 
                type="button"
                @click="addEducation" 
                class="text-sm px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                Add Education
              </button>
            </div>
            
            <div v-for="(edu, index) in profile.education.schools" :key="index" class="mb-8 border-b border-white/10 pb-8">
              <div class="flex justify-between">
                <h3 class="text-lg font-semibold text-white">Education {{ index + 1 }}</h3>
                <button 
                  v-if="profile.education.schools.length > 1"
                  type="button"
                  @click="removeEducation(index)" 
                  class="text-sm px-2 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                >
                  Remove
                </button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Institution</label>
                  <input
                    v-model="edu.institution"
                    type="text"
                    placeholder="School or university name"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Degree</label>
                  <input
                    v-model="edu.degree"
                    type="text"
                    placeholder="e.g. Bachelor's, Master's"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Field of Study</label>
                  <input
                    v-model="edu.field"
                    type="text"
                    placeholder="e.g. Computer Science"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-green-400 mb-2">Start Date</label>
                  <input
                    v-model="edu.startDate"
                    type="month"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                
                <div class="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    :id="`currentEdu-${index}`" 
                    v-model="edu.current"
                    class="h-4 w-4 rounded text-green-500 focus:ring-green-400"
                  >
                  <label :for="`currentEdu-${index}`" class="text-white text-sm">I'm currently studying here</label>
                </div>
                
                <div v-if="!edu.current">
                  <label class="block text-sm font-medium text-green-400 mb-2">End Date</label>
                  <input
                    v-model="edu.endDate"
                    type="month"
                    class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div class="mt-4">
                <label class="block text-sm font-medium text-green-400 mb-2">Description</label>
                <textarea
                  v-model="edu.description"
                  rows="3"
                  placeholder="Additional information about your studies..."
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- Skills Section -->
          <div v-show="state.activeTab === 'skills'" class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h2 class="text-xl font-semibold text-green-400 mb-6">Skills</h2>
            
            <!-- Technical Skills -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-green-400 mb-2">Technical Skills</label>
              <div class="flex flex-wrap gap-2 mb-3">
                <div 
                  v-for="(skill, index) in profile.skills.technicalSkills" 
                  :key="skill"
                  class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ skill }}
                  <button @click="removeSkill('technical', index)" class="ml-2 text-green-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex">
                <input
                  v-model="newSkill"
                  type="text"
                  placeholder="Add a technical skill"
                  class="flex-1 bg-white/5 border border-green-500/30 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  @keyup.enter="addSkill('technical')"
                />
                <button 
                  type="button"
                  @click="addSkill('technical')" 
                  class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-r-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            <!-- Soft Skills -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-green-400 mb-2">Soft Skills</label>
              <div class="flex flex-wrap gap-2 mb-3">
                <div 
                  v-for="(skill, index) in profile.skills.softSkills" 
                  :key="skill"
                  class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ skill }}
                  <button @click="removeSkill('soft', index)" class="ml-2 text-blue-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex">
                <input
                  v-model="newSoftSkill"
                  type="text"
                  placeholder="Add a soft skill"
                  class="flex-1 bg-white/5 border border-blue-500/30 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  @keyup.enter="addSkill('soft')"
                />
                <button 
                  type="button"
                  @click="addSkill('soft')" 
                  class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-r-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            <!-- Languages -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-green-400 mb-2">Languages</label>
              <div class="flex flex-wrap gap-2 mb-3">
                <div 
                  v-for="(lang, index) in profile.skills.languages" 
                  :key="lang"
                  class="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ lang }}
                  <button @click="removeSkill('language', index)" class="ml-2 text-purple-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex">
                <input
                  v-model="newLanguage"
                  type="text"
                  placeholder="Add a language"
                  class="flex-1 bg-white/5 border border-purple-500/30 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  @keyup.enter="addSkill('language')"
                />
                <button 
                  type="button"
                  @click="addSkill('language')" 
                  class="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-r-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            <!-- Certifications -->
            <div>
              <label class="block text-sm font-medium text-green-400 mb-2">Certifications</label>
              <div class="flex flex-wrap gap-2 mb-3">
                <div 
                  v-for="(cert, index) in profile.skills.certifications" 
                  :key="cert"
                  class="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ cert }}
                  <button @click="removeSkill('certification', index)" class="ml-2 text-yellow-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex">
                <input
                  v-model="newCertification"
                  type="text"
                  placeholder="Add a certification"
                  class="flex-1 bg-white/5 border border-yellow-500/30 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  @keyup.enter="addSkill('certification')"
                />
                <button 
                  type="button"
                  @click="addSkill('certification')" 
                  class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-r-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <!-- Resume & Documents Section -->
          <div v-show="state.activeTab === 'documents'" class="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h2 class="text-xl font-semibold text-green-400 mb-6">Resume & Documents</h2>
            
            <!-- Resume Upload -->
            <div class="mb-8 bg-white/5 border border-green-500/30 rounded-lg p-6">
              <h3 class="text-lg font-medium text-white mb-4">Resume</h3>
              
              <div v-if="profile.documents.hasResume" class="mb-6">
                <div class="flex items-center space-x-4">
                  <div class="bg-green-500/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-white">{{ profile.documents.resumeName }}</p>
                    <p class="text-gray-400 text-sm">Uploaded resume</p>
                  </div>
                  <button 
                    type="button"
                    class="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
              
              <div>
                <p class="text-gray-300 mb-4">Upload a new resume to use for job applications</p>
                <div class="bg-white/5 border-2 border-dashed border-green-500/30 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="resume"
                    @change="handleResumeUpload"
                    accept=".pdf,.doc,.docx"
                    class="hidden"
                  />
                  <label for="resume" class="cursor-pointer block">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-400/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    
                    <span v-if="!resumeFileName" class="text-green-400">
                      Drag and drop your resume here or <span class="underline">browse files</span>
                    </span>
                    <span v-else class="text-green-400">
                      {{ resumeFileName }} selected
                    </span>
                    
                    <p class="text-gray-400 text-sm mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </label>
                </div>
              </div>
            </div>
            
            <!-- Cover Letter Template -->
            <div>
              <h3 class="text-lg font-medium text-white mb-4">Default Cover Letter Template</h3>
              <p class="text-gray-300 mb-4">This template will be pre-filled when applying for jobs</p>
              
              <textarea
                v-model="profile.documents.coverLetterTemplate"
                rows="8"
                placeholder="Write a default cover letter template that you can customize for each job application..."
                class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              ></textarea>
              
              <p class="text-sm text-gray-400 mt-2">
                Tips: Include placeholders like [COMPANY] and [POSITION] that you can replace for each application.
              </p>
            </div>
          </div>
          
          <!-- Save Button -->
          <div class="mt-8 flex justify-center">
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
              <span>{{ state.isSubmitting ? 'Saving...' : 'Save Profile' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add tailwind color utilities for elements that need specific colors */
.bg-blue-500\/20 { background-color: rgba(59, 130, 246, 0.2); }
.border-blue-500\/30 { border-color: rgba(59, 130, 246, 0.3); }
.text-blue-400 { color: rgba(96, 165, 250, 1); }

.bg-purple-500\/20 { background-color: rgba(168, 85, 247, 0.2); }
.border-purple-500\/30 { border-color: rgba(168, 85, 247, 0.3); }
.text-purple-400 { color: rgba(192, 132, 252, 1); }

.bg-yellow-500\/20 { background-color: rgba(234, 179, 8, 0.2); }
.border-yellow-500\/30 { border-color: rgba(234, 179, 8, 0.3); }
.text-yellow-400 { color: rgba(250, 204, 21, 1); }

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

input[type="date"], input[type="month"] {
  color-scheme: dark;
}
</style>