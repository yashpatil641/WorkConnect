<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

import { SignUpButton, UserButton,useUser,useAuth,SignOutButton ,SignInButton} from '@clerk/vue';
import { ref ,watchEffect} from 'vue';
const { isLoaded, user,isSignedIn} = useUser();
const userid = ref(null);
watchEffect(() => {
  if (isLoaded && user?.value) {
    userid.value = user.value.id;
    console.log("useridfromclerk",userid.value)
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
      await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobId}`,{
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
    console.log("USerr if from backend" , state.job.userId)
  } catch (error) {
    console.error('Error fetching job', error);
  } finally {
    state.isLoading = false;
  }
});
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.poppins-regular {

  font-family: "Poppins", serif;
  font-weight: 500;
  font-style: normal;

}
</style>





<template>
  <div class="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-10 pt-16">
  <BackButton />
  <section v-if="!state.isLoading" class=" poppins-regular min-h-screen text-white">
    <div class="container m-auto px-6 ">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white/10 p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white/10 p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-600 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-600 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        <aside>
          <div class="bg-white/10 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6 text-green-600">Company Info</h3>

            <h2 class="text-2xl ">{{ state.job.company.name }}</h2>

            <p class="my-2 text-white/70">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl text-green-700">Contact Email:</h3>

            <p class="my-2   p-2 bg-green-200/10 rounded">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl text-green-700">Contact Phone:</h3>

            <p class="my-2 text-  p-2 bg-green-200/10 rounded">
              {{ state.job.company.contactPhone }}
            </p>
          </div>


          <div v-if="userid !== state.job.userId" class="bg-white/10 p-6 rounded-lg shadow-md mt-6">
            <RouterLink :to="`/jobs/apply/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block">
              Apply for this Job 
            </RouterLink>
          </div>
          <div v-else class="bg-white/10 p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink :to="`/jobs/edit/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit Job</RouterLink>
            <button @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center h-screen text-gray-500 py-6">
    <PulseLoader />
  </div>
</div>

</template>




 