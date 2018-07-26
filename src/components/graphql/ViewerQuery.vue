<template>
  <div v-if="$apollo.loading">
    <loader/>
  </div>
  <div v-else-if="viewer">
    <slot :viewer="viewer">

    </slot>
  </div>
</template>

<script>
import Loader from "../ui/Loader";
export default {
  name: "ViewerQuery",
  components: { Loader },
  props: {
    tag: {type: String, required: false, default: 'div'}
  },
  apollo: {
    viewer: {
      query: require("../../graphql/queries/user/ViewerQuery.graphql")
    }
  }
};
</script>

<style lang="scss">
</style>
