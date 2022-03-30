<template>
  <div class="home">
    <Navbar />
    <LoginForm class="login" />
  </div>
</template>

<script>
import Navbar from "@/components/layouts/Navbar";
import LoginForm from "@/components/login/LoginForm";

export default {
  name: "Login",
  components: {
    Navbar,
    LoginForm,
  },
};
</script>
<style scoped>
.home {
  display: flex;
  align-items: center;
  height: 100vh;
}
.login {
  background: #eee;
}
</style>