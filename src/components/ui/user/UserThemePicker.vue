<template>
    <div class="user-theme-picker">
      <button v-for="theme in availableThemes" :key="theme"
           class="theme-icon" :class="{'active': theme.toLowerCase() === viewerTheme, [theme.toLowerCase()]: true}"
           @click.prevent="changeTheme(theme)" :disabled="loading">
      </button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { CHANGE_USER_THEME } from "../../../store/modules/user/actions";
export default {
  name: "user-theme-picker",
  props: {
    viewerTheme: { type: String, required: true, default: "light" }
  },
  data() {
    return {
      availableThemes: ["LIGHT", "DARK"],
      loading: false
    };
  },
  methods: {
    ...mapActions("user", [CHANGE_USER_THEME]),
    async changeTheme(theme) {
      if (theme.toLowerCase() === this.viewerTheme.toLowerCase()) return;
      this.loading = true;
      await this.$apollo.mutate({
        mutation: require("../../../graphql/mutations/UpdateUserPreferenceMutation.graphql"),
        variables: { input: { theme } }
      });
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-theme-picker {
  display: flex;
  & .theme-icon {
    transition: all $transition-duration;
    width: 40px;
    height: 40px;
    background: $grey;
    border-radius: $main-border-radius;
    @include navbarShadow();
    border: $green 2px solid;
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      cursor: pointer;
      @include mainShadow($darker);
    }
    &.light {
      background: $white;
    }
    &.dark {
      background: $medium-dark;
    }
    &.active {
      @include navbarShadow($yellow, 0);
    }
    &:disabled {
      filter: grayscale(80%);
      cursor: not-allowed;
    }
  }
}
</style>
