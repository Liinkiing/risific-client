<template>
  <nav class="main-navigation">
    <div class="container">
      <router-link :to="{name: 'home'}">Risific</router-link>
      <div class="pull-right">
        <ViewerQuery v-if="isLoggedIn">
          <template slot-scope="{ viewer }">
              <router-link :to="{name: 'me'}">
                {{ viewer.username }}
              </router-link>
              <button class="logout-button" @click="logout">Se déconnecter</button>
          </template>
        </ViewerQuery>
        <router-link v-else :to="{name: 'login'}">Connexion</router-link>
      </div>
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
      EventBus.$emit(EVENT_LOGOUT);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-navigation {
  background: $medium-dark;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $navbar-height;
  & .pull-right {
    margin-left: auto;
  }
  & .container {
    display: flex;
    align-items: center;
    height: 100%;
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
