import Vue from "vue";
import vueHeadful from "vue-headful";
import App from "./App.vue";
import "./assets/scss/app.scss";
import router from "./router";
import store from "./store/";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.debug = process.env.NODE_ENV === "development";
Vue.config.silent = process.env.NODE_ENV !== "development";

Vue.component("vue-headful", vueHeadful);

new Vue({
  router,
  provide: createProvider().provide(),
  store,
  render: h => h(App)
}).$mount("#app");
