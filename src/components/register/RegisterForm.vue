<template>
  <div class="container my-5">
    <form @submit.prevent="submit()">
      <div class="mb-3">
        <label for="Name" class="form-label">الاسم</label>
        <input
          type="text"
          class="form-control text-end"
          id="Name"
          v-model="Name"
        />
      </div>
      <div class="mb-3">
        <label for="Email" class="form-label">البريد الإلكترونى</label>
        <input
          type="email"
          class="form-control text-end"
          id="Email"
          placeholder="name@example.com"
          v-model="Email"
        />
      </div>
      <div class="mb-3">
        <label for="Password" class="form-label">كلمه السر</label>
        <input
          type="password"
          class="form-control text-end"
          id="Password"
          v-model="Password"
        />
      </div>
      <div class="mb-3">
        <label for="input1" class="form-label">الوصف</label>
        <textarea
          type="text"
          class="form-control text-end"
          id="input1"
          v-model="Name"
        ></textarea>
      </div>
      <!-- Start image-->
      <div class="mb-3">
        <label for="formFile" class="form-label">الصورة الشخصيه</label>
        <template v-if="imgPreview">
          <img :src="imgPreview" class="img-fluid" height="300" />
          <p class="mb-0">file name: {{ imgData.value.name }}</p>
          <p class="mb-0">
            size: {{ Math.round(imgData.value.size / 1024) }}KB
          </p>
        </template>
        <div class="flex">
          <h6 class="mb-3 text-white">
            حاله رفع الصوره :
            <span v-if="imgUpload == 100">أكتمل</span>
          </h6>
        </div>
        <input
          class="form-control"
          type="file"
          id="formFile"
          accept="image/jpeg"
          @change="DetectFiles($event.target.files)"
        />
      </div>
      <!-- End image-->
      <button type="submit" class="btn bg-main fw-bold my-4 btn-primary">
        التسجيل
      </button>
      <hr />
      <router-link
        class="link text-center fw-bold"
        aria-current="page"
        to="/login"
        >تسجيل الدخول</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import firebase from "@/firebase";

export default {
  name: "RegisterForm",
  setup() {
    const router = useRouter();

    const Name = ref("");
    const Email = ref("");

    const Password = ref("");

    function submit() {
      var db = firebase.firestore();
      firebase
        .auth()
        .createUserWithEmailAndPassword(Email.value, Password.value)
        .then(() => {
          db.collection("Users")
            .add({
              name: Name.value,
              email: Email.value.toLowerCase(),
            })
            .then(() => {
              router.push("/profile");
            });
        });
    }

    return { Name, Email, Password, submit };
  },
};
</script>

<style scoped>
.container {
  width: 750px;
}
</style>
