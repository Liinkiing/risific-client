import actions from "./actions";
import mutations from "./mutations";
import { AUTH_TOKEN } from "../../../vue-apollo";

const state = {
  isLoggedIn: localStorage.getItem(AUTH_TOKEN) !== null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
