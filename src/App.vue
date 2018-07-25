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
export default {
  components: { AppHeader },
  methods: {
    ...mapMutations("user", [SET_LOGGED_IN])
  },
  created() {
    EventBus.$on("login", async ({ token, refreshToken }) => {
      await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
      this[SET_LOGGED_IN](true);
    });
    EventBus.$on("logout", async () => {
      await onLogout(this.$apolloProvider.defaultClient);
      this[SET_LOGGED_IN](false);
    });
  }
};
</script>
