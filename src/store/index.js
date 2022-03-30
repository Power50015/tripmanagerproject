import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLogin: false,
      Id: "",
      Name: "",
      Email: "",
    };
  },
  mutations: {
    authLogin(state, payload) {
      state.isLogin = true;
      state.Id = payload.Id;
      state.Name = payload.name;
      state.Email = payload.email;
    },
    authLogout(state) {
      state.isLogin = false;
      state.Id = "",
      state.Name = "";
      state.Email = "";
    }
  },
  actions: {},
  modules: {},
});
