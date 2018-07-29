<template>
  <div class="loader" :class="{'loader-inline': inline, 'with-background': withBackground}">
    <img src="../../assets/images/tail-spin.svg" class="loader-icon" alt="">
  </div>
</template>

<script>
export default {
  name: "loader",
  props: {
    inline: { type: Boolean, required: false, default: false },
    withBackground: { type: Boolean, required: false, default: false },
  }
};
</script>

<style lang="scss" scoped>
.loader {
  &.loader-inline {
    display: inline-block;
  }
  &.with-background {
    padding: 20px;
    background: transparentize($darker, 0.4);
    border-radius: $card-border-radius;
  }
}
</style>
