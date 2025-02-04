<!-- <script setup>
import { SignUpButton, UserButton, useUser, SignOutButton, SignInButton } from '@clerk/vue';

</script>
<template>
	<div class="h-screen bg-primary flex flex-col items-center justify-center gap-10">
		<div>
			<h2 class="text">Already a User??</h2>
			<button
			class="bg-green-500/60 hover:bg-green-800 text-white text-center font-semibold py-2 px-4 rounded-lg w-[15vw] focus:outline-none focus:shadow-outline block">
				<SignInButton/>
			</button>
		</div>
		<button
		class="bg-green-500/60 hover:bg-green-800 text-white text-center font-semibold py-2 px-4 rounded-lg w-[15%] focus:outline-none focus:shadow-outline block">
			<SignUpButton/>
		</button>

	</div>
</template> -->



<script setup>
import { SignUpButton,SignInButton } from '@clerk/vue';
import { useAuth } from '@clerk/vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const { isSignedIn, isLoaded } = useAuth();
const router = useRouter();
console.log("Jjjjj",isSignedIn.value)
onMounted(() => {
  if (isLoaded && isSignedIn.value) {
    router.push('/');
  }
});
</script>

<template>
  <div class="min-h-screen bg-primary flex items-center justify-center py-12 px-10 sm:px-6 lg:px-10">
    <div class="max-w-4xl w-full space-y-8 bg-white/10 p-8 mt-10 rounded-xl backdrop-blur-sm">
      <div class="text-center">
        <h2 class="text-4xl font-bold text-green-500 mb-2">Join WorkConnect</h2>
        <p class="text-gray-300 text-lg">Connect with top employers and find your dream job</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left section -->
        <div class="space-y-6">
          <div class="bg-white/5 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-green-400 mb-4">For Job Seekers</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Access to thousands of jobs
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Create professional profile
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Direct apply to companies
              </li>
            </ul>
          </div>
        </div>

        <!-- Right section -->
        <div class="space-y-6">
          <div class="bg-white/5 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-green-400 mb-4">For Employers</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Post unlimited jobs
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Browse candidate profiles
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Manage job listings
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <SignUpButton mode="modal" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200" />
        <p class="mt-4 text-gray-400">
          Already have an account? 
					<SignInButton class="text-green-500 hover:text-green-400"/>
          <!-- <RouterLink to="/login" class="text-green-500 hover:text-green-400">Sign in</RouterLink> -->
        </p>
      </div>
    </div>
  </div>
</template>