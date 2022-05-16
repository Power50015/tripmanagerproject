<template>
  <main>
    <div class="login">
      <h2 class="border-bottom mb-3 d-block p-3 text-center">الزيارات</h2>
      <div class="container mt-4">
        <div class="row text-center">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">المستخدم</th>
                <th scope="col">المكان السياحى</th>
                <th scope="col">تاريخ الذهاب</th>
                <th scope="col">تاريخ العوده</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in adminData" :key="data.id" class="p-3">
                <th>{{ data.userName }}</th>
                <th>{{ data.trip["name"] }}</th>
                <th>
                  {{ date(data.dateFrom) }}
                </th>
                <th>{{ date(data.dateTo)  }}</th>
              </tr>
            </tbody>
          </table>
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
import { getFirestore, orderBy } from "firebase/firestore";
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
  const q = query(collection(db, "myTrips"),orderBy("dateFrom"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    adminData.push(doc.data());
  });
}

function date(string) {
  let time = string;

  let t = new Date(time);

  let hr = ("0" + t.getHours()).slice(-2);
  let min = ("0" + t.getMinutes()).slice(-2);
  let sec = ("0" + t.getSeconds()).slice(-2);

  return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
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
