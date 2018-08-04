import { SET_VIEWER as SET_VIEWER_MUTATION } from "./mutations";

export const CHANGE_USER_THEME = "CHANGE_USER_THEME";
export const SET_VIEWER = "SET_VIEWER";

export default {
  [CHANGE_USER_THEME]({ state }) {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${state.viewer.preference.theme}-theme`);
  },
  [SET_VIEWER]({ commit, dispatch }, viewer) {
    commit(SET_VIEWER_MUTATION, viewer);
    dispatch(CHANGE_USER_THEME);
  }
};
