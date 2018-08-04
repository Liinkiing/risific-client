export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_CURRENT_THEME = "SET_CURRENT_THEME";

export default {
  [SET_LOGGED_IN](state, loggedIn) {
    state.isLoggedIn = loggedIn;
  },
  [SET_CURRENT_THEME](state, newTheme) {
    state.currentTheme = newTheme;
  }
};
