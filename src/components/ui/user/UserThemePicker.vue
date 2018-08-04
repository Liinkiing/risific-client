<template>
  <div class="user-theme-picker">
    <button v-for="theme in availableThemes" :key="theme"
            class="theme-icon" :class="{'active': theme.toLowerCase() === viewer.preference.theme, [theme.toLowerCase()]: true}"
            @click.prevent="changeTheme(theme)" :disabled="loading">
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "user-theme-picker",
  data() {
    return {
      availableThemes: ["LIGHT", "DARK"],
      loading: false
    };
  },
  computed: {
    ...mapState('user', ['viewer'])
  },
  methods: {
    async changeTheme(theme) {
      if (theme.toLowerCase() === this.viewer.preference.theme.toLowerCase())
        return;
      this.loading = true;
      await this.$apollo.mutate({
        mutation: require("../../../graphql/mutations/UpdateUserPreferenceMutation.graphql"),
        variables: { input: { theme } },
        optimisticResponse: {
          __typename: "Mutation",
          updateUserPreference: {
            __typename: "UpdateUserPreferencePayload",
            userPreference: {
              __typename: "UserPreference",
              id: this.viewer.preference.id || -1,
              theme: theme.toLowerCase()
            }
          }
        }
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
