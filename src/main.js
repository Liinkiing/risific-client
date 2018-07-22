import Vue from "vue";
import vueHeadful from "vue-headful";
import App from "./App.vue";
import "./assets/scss/app.scss";
import router from "./router";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

Vue.component("vue-headful", vueHeadful);

new Vue({
  router,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount("#app");
