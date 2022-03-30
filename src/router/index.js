import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { middleware: "guest" }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { middleware: "guest" }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { middleware: "guest" }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { middleware: "user" }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, form, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/index`);
    if (middleware) {
      middleware.default(next, store, to.meta.middleware);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
