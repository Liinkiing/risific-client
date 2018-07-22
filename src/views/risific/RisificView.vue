<template>
  <div class="risific-page">
    <ApolloQuery :query="require('../../graphql/queries/RisificViewQuery.graphql')"
                 :variables="{ slug }">
      <template slot-scope="{ result: { data, loading, error } }">
        <div v-if="loading" class="fixed-bloc">
          <loader/>
        </div>
        <div v-else-if="data && data.risific">
          <vue-headful :title="'Risific - ' + data.risific.title"/>
          <h1>{{ data.risific.title }}</h1>
          <risific-pagination :chapters-count="data.risific.chaptersCount"
                              :risific-slug="data.risific.slug"/>
          <router-view :risific-title="data.risific.title" :chapters-count="data.risific.chaptersCount" :key="$route.fullPath"></router-view>
          <risific-pagination :chapters-count="data.risific.chaptersCount"
                              :risific-slug="data.risific.slug"/>
        </div>
        <div v-else-if="data && !data.risific">
          <h1>Désolé khey</h1>
          <h2>Cette fic n'existe pas</h2>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import RisificPagination from "../../components/risific/RisificPagination";
import Loader from "../../components/ui/Loader";

export default {
  name: "risific-view",
  components: { Loader, RisificPagination },
  props: {
    slug: { type: String, required: true }
  }
};
</script>

<style scoped>
</style>
