<script setup>
import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();

const jobId = route.params.id;

const form = reactive({
  type: 'Full-Time',
  title: '',
  description: '',
  salary: '',
  location: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  },
});

const state = reactive({
  job: {},
  isLoading: true,
});

const toast = useToast();

const handleSubmit = async () => {
  const updatedJob = {
    title: form.title,
    type: form.type,
    location: form.location,
    description: form.description,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    const response = await axios.put(`/api/jobs/${jobId}`, updatedJob);
    toast.success('Job Updated Successfully');
    router.push(`/jobs/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching job', error);
    toast.error('Job Was Not Added');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    state.job = response.data;
    // Populate inputs
    form.type = state.job.type;
    form.title = state.job.title;
    form.description = state.job.description;
    form.salary = state.job.salary;
    form.location = state.job.location;
    form.company.name = state.job.company.name;
    form.company.description = state.job.company.description;
    form.company.contactEmail = state.job.company.contactEmail;
    form.company.contactPhone = state.job.company.contactPhone;
  } catch (error) {
    console.error('Error fetching job', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<!-- <template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Job Type</label
            >
            <select
              v-model="form.type"
              id="type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Job Listing Name</label
            >
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Salary</label
            >
            <select
              id="salary"
              v-model="form.salary"
              name="salary"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Under $50K">under $50K</option>
              <option value="$50K - $60K">$50 - $60K</option>
              <option value="$60K - $70K">$60 - $70K</option>
              <option value="$70K - $80K">$70 - $80K</option>
              <option value="$80K - $90K">$80 - $90K</option>
              <option value="$90K - $100K">$90 - $100K</option>
              <option value="$100K - $125K">$100 - $125K</option>
              <option value="$125K - $150K">$125 - $150K</option>
              <option value="$150K - $175K">$150 - $175K</option>
              <option value="$175K - $200K">$175 - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Location </label>
            <input
              type="text"
              v-model="form.location"
              id="location"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
              >Company Name</label
            >
            <input
              type="text"
              v-model="form.company.name"
              id="company"
              name="company"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
              >Company Description</label
            >
            <textarea
              id="company_description"
              v-model="form.company.description"
              name="company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Contact Email</label
            >
            <input
              type="email"
              v-model="form.company.contactEmail"
              id="contact_email"
              name="contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Contact Phone</label
            >
            <input
              type="tel"
              v-model="form.company.contactPhone"
              id="contact_phone"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template> -->


<template>
  <section class="min-h-screen bg-primary py-10 px-4">
    <div class="max-w-4xl mx-auto mt-20">
      <div class="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <h2 class="text-3xl font-bold text-green-500 mb-8 text-center">Edit Job Listing</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Job Details Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Job Type</label>
                <select
                  v-model="form.type"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                >
                  <option value="FULL_TIME">Full-Time</option>
                  <option value="PART_TIME">Part-Time</option>
                  <option value="REMOTE">Remote</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Job Title</label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="eg. Beautiful Apartment In Miami"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Salary</label>
                <select
                  v-model="form.salary"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - $100K">$50K - $100K</option>
                  <option value="$100K - $150K">$100K - $150K</option>
                  <option value="$150K+">$150K+</option>
                </select>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Description</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                ></textarea>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Location</label>
                <input
                  v-model="form.location"
                  type="text"
                  placeholder="Company Location"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Company Info Section -->
          <div class="mt-10 border-t border-green-500/30 pt-6">
            <h3 class="text-xl font-semibold text-green-400 mb-6">Company Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Company Name</label>
                <input
                  v-model="form.company.name"
                  type="text"
                  placeholder="Company Name"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Company Description</label>
                <textarea
                  v-model="form.company.description"
                  placeholder="What does your company do?"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                ></textarea>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Contact Email</label>
                <input
                  v-model="form.company.contactEmail"
                  type="email"
                  placeholder="Email address for applicants"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-green-400 mb-2">Contact Phone</label>
                <input
                  v-model="form.company.contactPhone"
                  type="tel"
                  placeholder="Optional phone number"
                  class="w-full bg-white/5 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 mt-8"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  </section>
</template>