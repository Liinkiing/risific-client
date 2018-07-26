<template>
  <div id="app">
    <vue-headful title="Risific"/>
    <app-header/>
    <main class="container">
      <transition name="fade-up" mode="out-in">
        <router-view/>
      </transition>
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
import { HOME_ROUTE, ME_ROUTE } from "./router/routes";
export default {
  components: { AppHeader },
  methods: {
    ...mapMutations("user", [SET_LOGGED_IN])
  },
  created() {
    EventBus.$on(EVENT_LOGIN, async ({ token, refreshToken }) => {
      await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
      this[SET_LOGGED_IN](true);
      this.$router.replace({ name: ME_ROUTE });
    });
    EventBus.$on(EVENT_LOGOUT, async () => {
      await onLogout(this.$apolloProvider.defaultClient);
      this[SET_LOGGED_IN](false);
      this.$router.replace({ name: HOME_ROUTE });
    });
  }
};
</script>
