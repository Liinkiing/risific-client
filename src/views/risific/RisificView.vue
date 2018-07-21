<template>
    <div class="risific-page">
        <ApolloQuery :query="require('../../graphql/queries/RisificViewQuery.graphql')"
                     :variables="{ slug }">
            <template slot-scope="{ result: { data, loading, error } }">
                <div v-if="data && data.risific">
                    <h1>{{ data.risific.title }}</h1>
                    <risific-pagination :chapters-count="data.risific.chaptersCount"
                                        :risific-slug="data.risific.slug"/>
                    <router-view :chapters-count="data.risific.chaptersCount"></router-view>
                    <risific-pagination :chapters-count="data.risific.chaptersCount"
                                        :risific-slug="data.risific.slug"/>
                </div>
                <div v-else>
                    <h1>Désolé khey</h1>
                    <h2>Cette fic n'existe pas</h2>
                </div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>
import RisificPagination from "../../components/risific/RisificPagination";
export default {
  name: "risific-view",
  components: { RisificPagination },
  props: {
    slug: { type: String, required: true }
  }
};
</script>

<style scoped>
</style>
