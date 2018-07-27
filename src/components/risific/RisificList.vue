<template>
  <ApolloQuery :query="require('../../graphql/queries/RisificList.graphql')" :variables="{ isAuthenticated }">
    <template slot-scope="{ result: { data, loading } }">
      <transition name="fade-up-fast" mode="out-in">
        <div v-if="loading" class="fixed-bloc">
          <loader/>
        </div>
        <ul v-else-if="data && data.risifics" class="risific-list">
          <li v-for="risific in data.risifics.edges" :key="risific.node.id" :class="{'favorited': isAuthenticated && risific.node.viewerHasFavorited}">
            <router-link :to="{
                    name: 'chapter.view',
                    params: {
                        slug: risific.node.slug,
                        chapterNumber: 1
                    }
                    }">
              {{ risific.node.title }}
            </router-link>
          </li>
        </ul>
      </transition>
    </template>
  </ApolloQuery>
</template>
<script>
import Loader from "../ui/Loader";
import AuthManager from "../../managers/AuthManager";

export default {
  components: { Loader },
  computed: {
    isAuthenticated() {
      return AuthManager.isLoggedIn();
    }
  }
};
</script>
<style lang="scss" scoped>
.risific-list {
  & li.favorited a {
    color: $yellow;
    &:hover {
      color: darken($yellow, 10%);
    }
  }
}
</style>
