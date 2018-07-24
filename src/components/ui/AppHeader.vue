<template>
  <nav class="main-navigation">
    <div class="container">
      <router-link :to="{name: 'home'}">Risific</router-link>
      <div class="pull-right">
        <ApolloQuery v-if="isLoggedIn" :query="require('../../graphql/queries/user/ViewerQuery.graphql')">
          <template slot-scope="{ result: { data, loading, error } }">
            <router-link v-if="data && data.viewer" :to="{name: 'login'}">{{ data.viewer.username }}</router-link>
          </template>
        </ApolloQuery>
        <router-link v-else :to="{name: 'login'}">Connexion</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app-header",
  computed: {
    ...mapState("user", ["isLoggedIn"])
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
</style>
