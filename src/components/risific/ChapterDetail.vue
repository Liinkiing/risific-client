<template>
    <ApolloQuery
            :query="require('../../graphql/queries/ChapterDetail.graphql')"
            :variables="{ slug, chapter }">
        <template slot-scope="{ result: { data, error, loading } }">
            <div v-if="loading" class="loading">Chargement...</div>

            <div v-else-if="error" class="error">An error occured</div>

            <div v-else-if="data" class="risific-content" v-html="data.chapters.edges[0].node.body">
                {{ data.chapters.edges[0].node.body }}
            </div>
        </template>
    </ApolloQuery>
</template>

<script>
    export default {
        name: "chapter-detail",
        props: {
            slug: {type: String, required: true},
            chapter: {type: Number, required: true}
        }
    };
</script>

<style scoped>
</style>
