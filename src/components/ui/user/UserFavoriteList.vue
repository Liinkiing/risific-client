<template>
    <ul v-if="favorites.totalCount > 0" class="user-favorites">
      <transition-group name="fade-up">
        <li v-for="favorite in favorites.edges.map(f => f.node)" :key="favorite.risific.id">
          <router-link :to="{name: 'chapter.view', params: {slug: favorite.risific.slug, chapterNumber: 1}}">
            {{ favorite.risific.title }}
          </router-link>
          (ajouté le {{ favorite.favoritedAt | moment('L') }})
          <ApolloMutation tag="span" :mutation="require('../../../graphql/mutations/DeleteUserFavoriteMutation.graphql')"
                          :variables="{ input: { risificId: favorite.risific.id } }"
                          :refetch-queries="refetchViewer">
            <template slot-scope="{ mutate, loading, error }">
              <button :disabled="loading" @click="mutate()">x</button>
              <p v-if="error"> {{ error }} </p>
            </template>
          </ApolloMutation>
        </li>
      </transition-group>
    </ul>
    <div v-else>
      Tu n'as aucun favoris pour le moment ! Vas lire des bonnes fics fait par des kheys !
    </div>
</template>

<script>
import Loader from "../Loader";
export default {
  name: "user-favorite-list",
  components: { Loader },
  props: {
    favorites: { type: Object, required: true }
  },
  methods: {
    refetchViewer() {
      return [
        {
          query: require("../../../graphql/queries/user/ViewerQuery.graphql")
        }
      ];
    }
  }
};
</script>

<style lang="scss">
</style>
