<template>
  <main>
    <div class="login">
      <h2 class="border-bottom mb-3 d-block p-3 text-center">الصفحه الشخصيه</h2>
      <div class="container">
        <form @submit.prevent="addImage">
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
              <h6 class="mb-3">
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
          <progress
            v-if="imgUpload != 0"
            id="file"
            max="100"
            :value="imgUpload"
            class="progress-bar w-100"
            role="progressbar"
          >
            {{ imgUpload }}
          </progress>
          <button type="submit" class="btn fw-bold btn-primary">
            أضف صوره
          </button>
        </form>
      </div>
      <div class="container mt-4">
      <div class="row text-center">
        <div class="col-12 col-lg-6" v-for="data in imgsData" :key="data.id">
          <div>
            <img
              class="bd-placeholder-img p-3"
              width="240"
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
const storage = getStorage();
const db = getFirestore();

const userImg = ref(auth.img);
const imgURL = ref<string>(auth.img);
const imgData = reactive([]);
const imgPreview = ref<any>("");
const imgUpload = ref(0);
const imgsData = reactive([]);

function addImage() {
  const storageRef = refire(storage, `${imgData.value.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imgData.value);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        imgURL.value = URL;

        auth.addImage(imgURL.value);
        imgData.length = 0;
        imgURL.value = "";
        imgPreview.value = "";
        imgUpload.value = 0;
      });
    }
  );
}

function DetectFiles(input) {
  imgData.value = input[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target.result;
    };
    reader.readAsDataURL(input[0]);
  }
}
getImageData();
async function getImageData() {
  imgsData.length = 0;

  const q = query(collection(db, "image"), where("user", "==", auth.email));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    imgsData.push(doc.data());
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
