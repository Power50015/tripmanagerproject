<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/profile" v-if="auth.isLogin">
        <img src="@/assets/logo.png" width="100" alt="" srcset="">
        </router-link>
        <router-link class="navbar-brand" to="/" v-if="!auth.isLogin">
        <img src="@/assets/logo.png" width="100" alt="" srcset="">
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="تبديل التنقل"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item" v-if="!auth.isLogin">
              <router-link to="/login" class="nav-link"
                >تسجيل الدخول</router-link
              >
            </li>
            <li class="nav-item" v-if="!auth.isLogin">
              <router-link to="/register" class="nav-link"
                >عمل حساب جديد</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.isLogin">
              <router-link to="/profile" class="nav-link"
                >الصفحه الشخصيه</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.isLogin">
              <router-link to="/gallery" class="nav-link"
                >معرض الصور</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.isLogin">
              <button @click="auth.logout" class="btn btn-danger">تسجيل الخروج</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>