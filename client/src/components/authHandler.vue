<script setup>
import { useAuth } from '@clerk/vue';
import { useUser } from '@clerk/vue';
import axios from 'axios';
import { watchEffect } from 'vue';

const { isLoaded, userId, getToken } = useAuth();
const { user } = useUser();

const createLocalUser = async () => {
  if (isLoaded && userId) {
    try {
      const token = await getToken.value();
      // Only send necessary user data
      console.log(token,user.value.id,user.value.emailAddresses[0].emailAddress,user.value.username)
      const userData = {
        id: user.value.id,
        email_address: user.value.emailAddresses[0].emailAddress,
        username: user.value.username
      };

      const response = await axios.post('http://127.0.0.1:8000/api/users/create', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Failed to create local user:', error.message);
    }
  }
};

watchEffect(() => {
  if (isLoaded && userId) {
    createLocalUser();
  }
});
</script>

<template>
</template>