<template>
  <main>
    <div class="login">
      <h2 class="border-bottom mb-3 d-block p-3 text-center">
        الأماكن السياحيه
      </h2>
      <div class="container">
        <router-link
          class="link text-center fw-bold"
          aria-current="page"
          to="/trips"
          >جدول الزيارات</router-link
        >
      </div>
      <div class="container mt-4">
        <div class="row text-center">
          <div class="col-12 col-lg-6 " v-for="data in adminData" :key="data.id">
            <div class="bg-secondary m-3 pt-3">
                <h3 class="text-white">{{data.name}}</h3>
              <img
                class="bd-placeholder-img pt-3 w-100"
                height="240"
                role="img"
                :src="data.img"
              />
            </div>
          </div>

          <!-- /.col-lg-4 -->
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const router = useRouter();
const auth = useAuthStore();
const db = getFirestore();

const adminData = reactive([]);
getImageData();
async function getImageData() {
  const q = query(collection(db, "admin"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    adminData.push(doc.data());
  });
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
  //   min-height: 150px;
  //   height: 1550px;
  margin: 120px 0;
  width: 750px;
}
.img-fluid {
  height: 150px !important;
}
@media only screen and (max-width: 918px) {
  .login {
    width: 100%;
  }
}
</style>
