export const SET_LOGGED_IN = "SET_LOGGED_IN";

export default {
  [SET_LOGGED_IN](state, loggedIn) {
    state.isLoggedIn = loggedIn;
  }
};