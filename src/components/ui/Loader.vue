<template>
  <div class="loader" :class="{inline: 'loader-inline'}">
    <img src="../../assets/images/tail-spin.svg" class="loader-icon" alt="">
  </div>
</template>

<script>
export default {
  name: "loader",
  props: {
    inline: { type: Boolean, required: false, default: false }
  }
};
</script>

<style lang="scss" scoped>
.loader.loader-inline {
  display: inline-block;
}
</style>
