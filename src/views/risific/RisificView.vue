<template>
  <main class="container risific-page">
    <ApolloQuery :query="require('../../graphql/queries/RisificViewQuery.graphql')"
                 :variables="{ slug, isAuthenticated }">
      <template slot-scope="{ result: { data, loading, error } }">
        <div v-if="loading" class="fixed-bloc">
          <loader/>
        </div>
        <div v-else-if="data && data.risific">
          <vue-headful :title="'Risific - ' + data.risific.title"/>
          <h1>{{ data.risific.title }}</h1>
          <ApolloMutation v-if="isAuthenticated && data && data.risific.viewerHasFavorited" tag="span"
                          :mutation="require('../../graphql/mutations/DeleteUserFavoriteMutation.graphql')"
                          :variables="{input: { risificId: data.risific.id }}">
            <template slot-scope="{ mutate, loading, error }">
              <button class="button-primary" :disabled="loading" @click="mutate()">Supprimer des favoris</button>
              <p v-if="error">An error occured: {{ error }}</p>
            </template>
          </ApolloMutation>
          <ApolloMutation v-else-if="isAuthenticated && data && !data.risific.viewerHasFavorited" tag="span"
                          :mutation="require('../../graphql/mutations/AddUserFavoriteMutation.graphql')"
                          :variables="{input: { risificId: data.risific.id }}">
            <template slot-scope="{ mutate, loading, error }">
              <button class="button-primary" :disabled="loading" @click="mutate()">Ajouter aux favoris</button>
              <p v-if="error">An error occured: {{ error }}</p>
            </template>
          </ApolloMutation>

          <router-view :risific-title="data.risific.title" :chapters-count="data.risific.chaptersCount" :key="$route.fullPath"></router-view>
        </div>
        <div v-else-if="data && !data.risific">
          <h1>Désolé khey</h1>
          <h2>Cette fic n'existe pas</h2>
        </div>
      </template>
    </ApolloQuery>
  </main>
</template>

<script>
import { mapState } from "vuex";
import RisificPagination from "../../components/risific/RisificPagination";
import Loader from "../../components/ui/Loader";
import AuthManager from "../../managers/AuthManager";

export default {
  name: "risific-view",
  components: { Loader, RisificPagination },
  props: {
    slug: { type: String, required: true }
  },
  computed: {
    isAuthenticated() {
      return AuthManager.isLoggedIn();
    },
    ...mapState("user", ["isLoggedIn"])
  }
};
</script>

<style scoped>
</style>
