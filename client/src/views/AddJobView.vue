<script setup>
import router from '@/router';
import { useAuth,useUser } from '@clerk/vue';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
const { isLoaded, userId, getToken } = useAuth();
const { user } = useUser();
const form = reactive({
  id : '',
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

const toast = useToast();

const handleSubmit = async () => {
  const newJob = {
  title: form.title,
  type: form.type,
  description: form.description,
  salary: form.salary,
  location: form.location,
  userId: user.value.id, // Add userId for relation
  company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone || null
    }
};

if (isLoaded){
  try {
    const token = await getToken.value();
    const response = await axios.post('http://127.0.0.1:8000/api/jobs', newJob,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    toast.success('Job Added Successfully');
    router.push(`/jobs/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching job', error);
    toast.error('Job Was Not Added');
  }
}

};
</script>
<!-- 
<template>
  <section class="bg-primary poppins-regular">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white/10 px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6 text-white">Add Job</h2>

          <div class="mb-4">
            <label for="type" class="block font-bold mb-2 text-green-400/90"
              >Job Type</label
            >
            <select
              v-model="form.type"
              id="type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="REMOTE">Remote</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2 text-green-400/90"
              >Job Listing Name</label
            >
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="border focus:outline-none rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2 text-green-400/90"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              class="border focus:outline-none rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block font-bold mb-2 text-green-400"
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
            <label class="block font-bold mb-2 text-green-400"> Location </label>
            <input
              type="text"
              v-model="form.location"
              id="location"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2 focus:outline-none"
              placeholder="Company Location"
              required
            />
          </div>

          <h3 class="text-2xl mb-5 text-white mt-20">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-green-400 font-bold mb-2"
              >Company Name</label
            >
            <input
              type="text"
              v-model="form.company.name"
              id="company"
              name="company"
              class=" focus:outline-none border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-green-400 font-bold mb-2"
              >Company Description</label
            >
            <textarea
              id="company_description"
              v-model="form.company.description"
              name="company_description"
              class="focus:outline-none border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-green-400 font-bold mb-2"
              >Contact Email</label
            >
            <input
              type="email"
              v-model="form.company.contactEmail"
              id="contact_email"
              name="contact_email"
              class="focus:outline-none border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-green-400  font-bold mb-2"
              >Contact Phone</label
            >
            <input
              type="tel"
              v-model="form.company.contactPhone"
              id="contact_phone"
              name="contact_phone"
              class=" focus:outline-none border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-5"
              type="submit"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template> -->

<template>
  <section class="bg-gradient-to-br from-gray-900 via-black to-gray-900 poppins-regular min-h-screen py-8 px-4 ">
    <div class="container m-auto max-w-2xl mt-20">
      <div class="bg-white/10 px-6 py-8 shadow-md rounded-md space-y-6">
        <!-- Title -->
        <h2 class="text-3xl text-center font-semibold mb-3 text-white">Add Job</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Job Type -->
          <div>
            <label for="type" class="block font-bold mb-2 text-green-400">Job Type</label>
            <select
              v-model="form.type"
              id="type"
              name="type"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 transition-all duration-300"
              required
            >
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="REMOTE">Remote</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          <!-- Job Listing Name -->
          <div>
            <label for="name" class="block text-green-400 font-bold mb-2">Job Listing Name</label>
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-green-400 font-bold mb-2">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              rows="4"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <!-- Salary -->
          <div>
            <label for="salary" class="block font-bold mb-2 text-green-400">Salary</label>
            <select
              id="salary"
              v-model="form.salary"
              name="salary"
              required
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 transition-all duration-300"
            >
              <option value="Under $50K">Under $50K</option>
              <option value="$50K - $60K">$50K - $60K</option>
              <option value="$60K - $70K">$60K - $70K</option>
              <option value="$70K - $80K">$70K - $80K</option>
              <option value="$80K - $90K">$80K - $90K</option>
              <option value="$90K - $100K">$90K - $100K</option>
              <option value="$100K - $125K">$100K - $125K</option>
              <option value="$125K - $150K">$125K - $150K</option>
              <option value="$150K - $175K">$150K - $175K</option>
              <option value="$175K - $200K">$175K - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block font-bold mb-2 text-green-400">Location</label>
            <input
              type="text"
              v-model="form.location"
              id="location"
              name="location"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Company Location"
              required
            />
          </div>

          <!-- Company Info Title -->
          <h3 class="text-2xl text-white mt-10 mb-3">Company Info</h3>

          <!-- Company Name -->
          <div>
            <label for="company" class="block text-green-400 font-bold mb-2">Company Name</label>
            <input
              type="text"
              v-model="form.company.name"
              id="company"
              name="company"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Company Name"
            />
          </div>

          <!-- Company Description -->
          <div>
            <label for="company_description" class="block text-green-400 font-bold mb-2">Company Description</label>
            <textarea
              id="company_description"
              v-model="form.company.description"
              name="company_description"
              rows="4"
              placeholder="What does your company do?"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
            ></textarea>
          </div>

          <!-- Contact Email -->
          <div>
            <label for="contact_email" class="block text-green-400 font-bold mb-2">Contact Email</label>
            <input
              type="email"
              v-model="form.company.contactEmail"
              id="contact_email"
              name="contact_email"
              placeholder="Email address for applicants"
              required
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
          </div>

          <!-- Contact Phone -->
          <div>
            <label for="contact_phone" class="block text-green-400 font-bold mb-2">Contact Phone</label>
            <input
              type="tel"
              v-model="form.company.contactPhone"
              id="contact_phone"
              name="contact_phone"
              placeholder="Optional phone for applicants"
              class="focus:outline-none bg-white/5 border border-green-500/30 rounded w-full py-2 px-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-5 transition-all duration-300"
              type="submit"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
