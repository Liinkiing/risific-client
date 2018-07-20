<template>
    <ApolloQuery
            :query="require('../../graphql/ChaptersDetail.graphql')"
            :variables="{ slug, chapter }">
        <template slot-scope="{ result: { data, error, loading } }">
            <span v-if="loading" class="loading"></span>
            <div v-else class="chapter-content" v-html="data.chapters.edges[0].node.body">
                {{ data.chapters.edges[0].node.body }}
            </div>
        </template>
    </ApolloQuery>
</template>

<script>
export default {
  name: "chapter-detail",
  props: {
    slug: { type: String, required: true },
    chapter: { type: String, required: true }
  }
};
</script>

<style scoped>
</style>
