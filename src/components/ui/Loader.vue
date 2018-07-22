<template>
  <div class="loader">
    <img src="../../assets/images/tail-spin.svg" class="loader-icon" alt="">
  </div>
</template>

<script>
export default {
  name: "loader",
  props: {
    message: { type: String, required: false }
  }
};
</script>

<style lang="scss">
</style>
