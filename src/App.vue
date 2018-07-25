<template>
  <div id="app">
    <vue-headful title="Risific"/>
    <app-header/>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import AppHeader from "./components/ui/AppHeader";
import { EventBus } from "./main";
import { onLogin, onLogout } from "./vue-apollo";
import { SET_LOGGED_IN } from "./store/modules/user/mutations";
import { EVENT_LOGIN, EVENT_LOGOUT } from "./constants";
import { HOME_ROUTE } from "./router/routes";
export default {
  components: { AppHeader },
  methods: {
    ...mapMutations("user", [SET_LOGGED_IN])
  },
  created() {
    EventBus.$on(EVENT_LOGIN, async ({ token, refreshToken }) => {
      await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
      this[SET_LOGGED_IN](true);
      this.$router.replace({ name: HOME_ROUTE });
    });
    EventBus.$on(EVENT_LOGOUT, async () => {
      this[SET_LOGGED_IN](false);
      await onLogout(this.$apolloProvider.defaultClient);
    });
  }
};
</script>
