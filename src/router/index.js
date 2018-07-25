import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routes";
import { loginGuard } from "./guards";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes
});

router.beforeEach(loginGuard);

export default router;
