<template>
  <div id="app">
    <vue-headful title="Risific"/>
    <app-header/>
    <transition name="fade-up" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import AppHeader from "./components/ui/AppHeader";
import { EventBus } from "./main";
import { onLogin, onLogout } from "./vue-apollo";
import { SET_LOGGED_IN } from "./store/modules/user/mutations";
import { EVENT_LOGIN, EVENT_LOGOUT } from "./constants";

export default {
  components: { AppHeader },
  methods: {
    ...mapMutations("user", [SET_LOGGED_IN])
  },
  created() {
    EventBus.$on(EVENT_LOGIN, async ({ token, refreshToken, referrer }) => {
      onLogin(
        this.$apolloProvider.defaultClient,
        token,
        refreshToken,
        referrer
      );
    });
    EventBus.$on(EVENT_LOGOUT, async referrer => {
      onLogout(this.$apolloProvider.defaultClient, referrer);
    });
  }
};
</script>
