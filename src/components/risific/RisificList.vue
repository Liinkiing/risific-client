<template>
    <ApolloQuery :query="require('../../graphql/AllRisific.graphql')">
        <template slot-scope="{ result: { data, loading } }">
            <span v-if="loading" class="loading">Chargement...</span>
            <ul v-else class="risific-list">
                <li v-for="risific in data.risifics.edges" :key="risific.node.id">
                    <router-link :to="{
                    name: 'chapter.view',
                    params: {
                        slug: risific.node.slug,
                        chapter: 1
                    }
                    }">
                        {{ risific.node.title }}
                    </router-link>
                </li>
            </ul>
        </template>
    </ApolloQuery>
</template>

<script>
export default {
  name: "risific-list"
};
</script>

<style scoped>
</style>
