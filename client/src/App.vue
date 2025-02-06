<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
import AuthHandler from './components/authHandler.vue';
</script>

<template>
  <AuthHandler/>
  <Navbar />
  <RouterView />
</template>
