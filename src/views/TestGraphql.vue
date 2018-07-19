<template>
    <div>
        <ApolloQuery
                :query="require('../graphql/Risifics.graphql')" >
            <template slot-scope="{ result: { data, loading } }">
                {{ loading }}
                <h2 v-if="loading">Chargement...</h2>
                <div v-else>
                    <ul>
                        <li v-for="risific in data.risifics.edges">
                            {{ risific.node.title }}
                            <ul>
                                <li v-for="chapter in risific.node.chapters.edges">
                                    {{ chapter.node.title }} ({{ chapter.node.position }})
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>
export default {
    name: "test-graphql",
}
</script>

<style scoped>

</style>