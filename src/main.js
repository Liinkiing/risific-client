import Vue from "vue";
import vueHeadful from "vue-headful";
import vueMoment from "vue-moment";
import moment from "moment";
import "moment/locale/fr";
import feather from 'vue-icon';

import App from "./App.vue";
import "./assets/scss/app.scss";
import router from "./router/";
import store from "./store/";
import { createProvider } from "./vue-apollo";

export const EventBus = new Vue();

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.debug = process.env.NODE_ENV === "development";
Vue.config.silent = process.env.NODE_ENV !== "development";

Vue.component("vue-headful", vueHeadful);
Vue.use(vueMoment, { moment });
Vue.use(feather);

new Vue({
  router,
  provide: createProvider().provide(),
  store,
  render: h => h(App)
}).$mount("#app");
