<template>
    <ApolloQuery
            :query="require('../../graphql/queries/RisificPagination.graphql')"
            :variables="{ slug }"
    >
        <template slot-scope="{ result: { data, loading } }">
            <div class="risific-pagination" v-if="data">
                <router-link v-for="chapterNumber in data.risifics.edges[0].node.chapters.totalCount"
                             :key="chapterNumber"
                             :to="{name: 'chapter.view', params: { slug, chapter: chapterNumber }}"
                >{{ chapterNumber }}
                </router-link>
            </div>
        </template>
    </ApolloQuery>
</template>

<script>
export default {
  name: "risific-pagination",
  props: {
    slug: { type: String, required: true }
  }
};
</script>

<style scoped>
</style>
