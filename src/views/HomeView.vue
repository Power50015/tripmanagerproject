<template>
  <Profile v-if="auth.type == 'user'" />
  <AdminDashbord v-if="auth.type == 'admin'" />
  <Home v-if="!auth.isLogin" />
</template>

<script setup lang="ts">
import Home from "@/components/Home.vue";
import Profile from "@/components/Profile.vue";
import AdminDashbord from "@/components/AdminDashbord.vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>

<style></style>
