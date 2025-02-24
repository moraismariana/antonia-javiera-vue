import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import initScript from "@/assets/js/script.js";
import "@/assets-admin/style/scss/style.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");

initScript();
