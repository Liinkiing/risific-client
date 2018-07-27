<template>
  <nav class="main-navigation">
    <div class="container">
      <router-link :to="{name: 'home'}">Risific</router-link>
      <ViewerQuery v-if="isLoggedIn">
        <template slot-scope="{ viewer }">
          <router-link :to="{name: 'me'}">
            {{ viewer.username }}
          </router-link>
          <button class="logout-button" @click="logout">Se déconnecter</button>
        </template>
      </ViewerQuery>
      <router-link class="login-button" v-else :to="{name: 'login'}">
        <icon name="user"/>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "../../main";
import { EVENT_LOGOUT } from "../../constants";
import Loader from "./Loader";
import ViewerQuery from "../graphql/ViewerQuery";

export default {
  name: "app-header",
  components: { ViewerQuery, Loader },
  computed: {
    ...mapState("user", ["isLoggedIn"])
  },
  methods: {
    logout() {
      EventBus.$emit(EVENT_LOGOUT, this.$route);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-navigation {
  background: $medium-dark;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: $navbar-height;
  box-shadow: $navbar-shadow;
  & .pull-right {
    margin-left: auto;
  }
  & .container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0 0 $margin-mobile;
    @include breakpoint(tablet) {
      max-width: 100%;
    }
    @include breakpoint(desktop) {
      max-width: 80%;
    }
  }
}

.login-button {
  background: $green;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin-left: auto;
  &:hover {
    background: darken($green, 3%);
    height: 60px;
  }
  & svg {
    width: 70%;
    height: 70%;
    color: $white;
  }
}

.logout-button {
  border: none;
  background: none;
  color: $green;
  transition: all $transition-duration;
  outline: none;
  &:hover {
    color: $hover-link;
    cursor: pointer;
  }
}
</style>
