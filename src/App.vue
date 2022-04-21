<template>
  <Navbar v-if="auth.isloaded" />
  <RouterView v-if="auth.isloaded" />
  <div v-if="!auth.isloaded">
    <Loding />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Navbar from "./components/Navbar.vue";
import Loding from "./components/Loding.vue";
const auth = useAuthStore();
</script>

<style>
@import "@/assets/base.scss";
</style>
