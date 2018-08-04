<template>
  <div class="user-theme-picker">
    <button v-for="theme in availableThemes" :key="theme"
            class="theme-icon" :class="{'active': theme.toLowerCase() === viewerPreference.theme, [theme.toLowerCase()]: true}"
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
    viewerPreference: { type: Object, required: true }
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
      if (theme.toLowerCase() === this.viewerPreference.theme.toLowerCase())
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
              id: this.viewerPreference.id || -1,
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
