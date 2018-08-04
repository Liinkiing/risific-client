import { SET_CURRENT_THEME } from "./mutations";

export const CHANGE_USER_THEME = "CHANGE_USER_THEME";

export default {
  [CHANGE_USER_THEME]({ commit, state }, newTheme) {
    commit(SET_CURRENT_THEME, newTheme);
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${state.currentTheme}-theme`);
  }
};
