import store from "../store";
import { HOME_ROUTE, LOGIN_ROUTE } from "./routes";

export const loginGuard = (to, from, next) => {
  if (to.name === LOGIN_ROUTE && store.state.user.isLoggedIn) {
    next({ name: HOME_ROUTE });
  } else {
    next();
  }
};
