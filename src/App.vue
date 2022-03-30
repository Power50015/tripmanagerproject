<template>
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import firebase from "@/firebase";

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const store = useStore();

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const db = firebase.firestore();
        db.collection("Users")
          .where("email", "==", user.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let data = {
                Id: user.uid,
                name: doc.data().name,
                email: doc.data().email,
              };
              store.commit("authLogin", data);
              router.push("/profile");
            });
          });
      } else {
        store.commit("authLogout");
      }
    });
  },
};
</script>

<style>
.btn-primary,
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:visited {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
a,
a:hover,
a:focus,
a:visited {
  color: #dc3545;
}
/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
  background-image: url(./assets/SDW.jpg);
  background-size: cover;
  overflow: hidden;
}

/* CUSTOMIZE THE CAROUSEL
  -------------------------------------------------- */

/* MARKETING CONTENT
  -------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

/* Featurettes
  ------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
}

/* RESPONSIVE CSS
  -------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>
