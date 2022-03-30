<template>
  <div class="home">
    <Navbar />
    <RegisterForm class="registerform py-5" />
  </div>
</template>

<script>
import Navbar from "@/components/layouts/Navbar";
import RegisterForm from "@/components/register/RegisterForm";
export default {
  name: "Register",
  components: {
    Navbar,
    RegisterForm,
  },
};
</script>

<style>
.home {
  display: flex;
  align-items: center;
  height: 100vh;
}
.registerform {
  background: #eee;
}
</style>