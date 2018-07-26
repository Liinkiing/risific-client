<template>
    <div class="user-info">
      <p>{{ user.username }}</p>
      <p>Inscrit le {{ user.createdAt | moment('LL') }}</p>
    </div>
    
</template>

<script>
export default {
  name: "user-info",
  props: {
    user: { type: Object, required: true }
  }
};
</script>

<style lang="scss">
</style>
