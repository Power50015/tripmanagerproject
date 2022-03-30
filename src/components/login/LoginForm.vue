<template>
  <div class="my-5 container">
    <form class="py-5" @submit.prevent="submit()">
      <div class="mb-3">
        <label for="FormControlInput1" class="form-label">البريد الإلكترونى</label>
        <input
          type="email"
          class="form-control text-end"
          id="FormControlInput1"
          placeholder="name@example.com"
          v-model="Email"
        />
      </div>
      <div class="mb-3">
        <label for="FormControlInput2" class="form-label">كلمه السر</label>
        <input
          type="password"
          class="form-control text-end"
          id="FormControlInput2"
          v-model="Password"
        />
      </div>
      <button type="submit" class="btn fw-bold my-4 btn-primary">تسجيل الدخول</button>
      <hr class="my-5" />
      <router-link
        class="link text-center fw-bold"
        aria-current="page"
        to="/register"
        >عمل حساب جديد</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import firebase from "@/firebase.js";

export default {
  name: "LoginForm",
  setup() {
    const router = useRouter();

    const Email = ref("");
    const Password = ref("");

    function submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(Email.value, Password.value)
        .then((userCredential) => {
          const db = firebase.firestore();
          const user = userCredential.user;

          db.collection("users")
            .where("Email", "==", user.email)
            .get()
            .then(() => {
              router.push("/profile");
            });
        });
    }

    return { Email, Password, submit };
  },
};
</script>
<style scoped>
.container {
  width: 750px;
}
</style>