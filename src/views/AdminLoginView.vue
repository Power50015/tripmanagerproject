<template>
  <main>
    <div class="login">
      <div class="my-5 container">
        <form class="py-5" @submit.prevent="LoginUser()">
          <div class="mb-3">
            <label for="userEmail" class="form-label">البريد الإلكترونى</label>
            <input
              type="email"
              class="form-control text-end"
              id="userEmail"
              placeholder="name@example.com"
              v-model="userEmail"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">كلمه السر</label>
            <input
              type="password"
              class="form-control text-end"
              id="password"
              v-model="userPassword"
            />
          </div>
          <button type="submit" class="btn fw-bold my-4 btn-primary">
            تسجيل الدخول
          </button>
          <hr class="my-5" />
          <router-link
            class="link text-center fw-bold"
            aria-current="page"
            to="/register"
            >عمل حساب جديد</router-link
          >
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const userEmail = ref("admin@admin.com");
const userPassword = ref("admin@admin.com");

const btn = ref(false);

async function LoginUser() {
  await auth.loginAdmin(userEmail.value, userPassword.value);
  userEmail.value = "";
  userPassword.value = "";
  router.push("/");
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.login {
  background: #eee;
  min-height: 150px;
  height: 500px;
  margin: 120px 0;
  width: 750px;
}
@media only screen and (max-width: 918px) {
  .login {
    width: 100%;
  }
}
</style>
