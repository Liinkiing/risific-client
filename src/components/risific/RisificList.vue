<template>
  <ApolloQuery :query="require('../../graphql/queries/RisificList.graphql')">
    <template slot-scope="{ result: { data, loading } }">
      <div v-if="loading" class="fixed-bloc">
        <loader/>
      </div>
      <ul v-else-if="data && data.risifics" class="risific-list">
        <li v-for="risific in data.risifics.edges" :key="risific.node.id">
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
    </template>
  </ApolloQuery>
</template>
<script>
import Loader from "../ui/Loader";

export default {
  components: { Loader }
};
</script>
