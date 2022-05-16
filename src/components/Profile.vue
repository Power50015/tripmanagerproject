<template>
  <main>
    <div class="login">
      <h2 class="border-bottom mb-3 d-block p-3 text-center">الصفحه الشخصيه</h2>
      <div class="logo-section text-center">
        <img :src="auth.img" width="200" height="200" class="rounded-circle" />
      </div>
      <div class="my-5 container">
        <form class="py-5" @submit.prevent="editUser()">
          <div class="mb-3">
            <label for="inputName" class="form-label">أسم المستخدم</label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              v-model="userName"
            />
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">البريد الإلكترونى</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              disabled
              :value="auth.email"
            />
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
          <div class="mb-3">
            <label for="inputArea" class="form-label">المنطقه</label>
            <select class="form-select" v-model="userArea" id="inputArea">
              <option disabled selected value="">حدد المنطقه</option>
              <option value="shrouq">الشروق</option>
              <option value="ismailia">إسماعليه</option>
              <option value="suze">السويس</option>
              <option value="cairo">القاهرة</option>
              <option value="geza">الجيزة</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="userAdrres" class="form-label">العنوان</label>
            <input
              type="text"
              class="form-control"
              id="userAdrres"
              v-model="userAdrres"
            />
          </div>
          <div class="mb-3">
            <label for="map" class="form-label">الخريطه</label>
            <input type="text" class="form-control" id="map" v-model="map" />
          </div>
          <div class="mb-3" v-if="map != ''">
            <iframe
              :src="GoogleMapsURLToEmbedURL"
              style="width: 100%"
              allowfullscreen="fasle"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div class="mb-3">
            <label for="userPhone" class="form-label">الهاتف</label>
            <input
              type="text"
              class="form-control"
              id="userPhone"
              v-model="userPhone"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">مواعيد العمل</label>
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  class="form-control"
                  id="startTime"
                  v-model="startTime"
                />
              </div>
              <div class="col-6">
                <input
                  type="number"
                  class="form-control"
                  id="endTime"
                  v-model="endTime"
                />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="inputDes" class="form-label">نبذه شخصيه</label>
            <textarea
              class="form-control"
              id="inputDes"
              v-model="userDes"
            ></textarea>
          </div>
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
          <button type="submit" class="btn fw-bold my-4 btn-primary">
            تعديل حساب
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const router = useRouter();
const auth = useAuthStore();
const storage = getStorage();

const userName = ref(auth.name);
const userDes = ref(auth.des);
const userArea = ref(auth.area);
const userAdrres = ref(auth.adrres);
const userImg = ref(auth.img);
const userPhone = ref(auth.phone);
const imgURL = ref<string>(auth.img);
const imgData = reactive([]);
const imgPreview = ref<any>("");
const startTime = ref(auth.startTime);
const endTime = ref(auth.endTime);
const map = ref(auth.map);
const imgUpload = ref(0);

const GoogleMapsURLToEmbedURL = computed(() => {
  var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(map.value);
  if (coords != null) {
    var coordsArray = coords[1].split(",");
    return (
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
      coordsArray[1] +
      "!3d" +
      coordsArray[0] +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098"
    );
  }
});

function editUser() {
  if (imgPreview.value === "") {
    auth.editUser(
      userName.value,
      userDes.value,
      userArea.value,
      userAdrres.value,
      userPhone.value,
      imgURL.value,
      startTime.value,
      endTime.value,
      map.value
    );
  } else {
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

          auth.editUser(
            userName.value,
            userDes.value,
            userArea.value,
            userAdrres.value,
            userPhone.value,
            imgURL.value,
            startTime.value,
            endTime.value,
            map.value
          );
        });
      }
    );
  }
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
  height: 1550px;
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
