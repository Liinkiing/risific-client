<template>
  <nav class="main-navigation" role="navigation">
    <div class="container">
      <router-link :to="{name: 'home'}">Risific</router-link>
      <ul class="desktop-menu">
        <menu-item v-if="isLoggedIn && viewer" :to="{name: 'me'}">{{ viewer.username }}</menu-item>
        <menu-item v-if="isLoggedIn && viewer" @click.prevent="logout">Se déconnecter</menu-item>
        <menu-item v-if="!isLoggedIn" :to="{name: 'login'}">Connexion</menu-item>
      </ul>
      <div @click.prevent="toggleMenu" class="menu-button">
        <button class="hamburger hamburger--slider" :class="{'is-active': showMenu}" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <transition name="fade-down" mode="in-out">
          <ul v-on-clickaway="hideMenu" class="mobile-menu" v-if="showMenu">
            <menu-item class="bright" v-if="isLoggedIn && viewer" :to="{name: 'me'}" icon="user">{{ viewer.username }}</menu-item>
            <menu-item class="bright" v-if="isLoggedIn && viewer" @click.prevent="logout" icon="log-out">Se déconnecter</menu-item>
            <menu-item class="bright" v-if="!isLoggedIn" :to="{name: 'login'}" icon="log-in">Connexion</menu-item>
          </ul>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "../../main";
import { EVENT_LOGOUT } from "../../constants";
import { directive as onClickaway } from "vue-clickaway";
import Loader from "./Loader";
import ViewerQuery from "../graphql/ViewerQuery";
import MenuItem from "./menu/MenuItem";

export default {
  name: "app-header",
  directives: {
    onClickaway
  },
  components: { MenuItem, ViewerQuery, Loader },
  data() {
    return {
      showMenu: false
    };
  },
  computed: {
    ...mapState("user", ["isLoggedIn"])
  },
  apollo: {
    viewer: {
      query: require("../../graphql/queries/user/ViewerQuery.graphql")
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
    logout() {
      EventBus.$emit(EVENT_LOGOUT, this.$route);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-navigation {
  background: $medium-dark;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: $navbar-height;
  box-shadow: $navbar-shadow;
  & .pull-right {
    margin-left: auto;
  }
  & .container {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0 0 $margin-mobile;
    @include breakpoint(tablet) {
      max-width: 80%;
    }
  }
}
.menu-button {
  position: relative;
  transition: all $transition-duration;
  background: $green;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin-left: auto;
  @include breakpoint(tablet) {
    display: none;
  }
  & button.hamburger {
    padding: 0;
    display: flex;
    & .hamburger-box {
      transform: scale(0.6);
      & .hamburger-inner {
        background: $white;
        &:before,
        &:after {
          background: inherit;
        }
      }
    }
  }
  &:hover {
    cursor: pointer;
    background: darken($green, 3%);
  }
  & svg {
    color: $white;
    &.icon-menu.opened {
      & line {
        opacity: 0;
      }
    }
  }
}

.desktop-menu {
  display: none;
  @include breakpoint(tablet) {
    display: flex;
    margin: 0 0 0 auto;
    padding: 0;
    & li {
      margin-right: 1rem;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}

.mobile-menu {
  display: flex;
  margin: 0;
  text-align: right;
  flex-direction: column;
  border-radius: 0 0 0 $card-border-radius;
  width: 400px;
  box-shadow: $main-shadow;
  right: 0;
  position: absolute;
  top: $navbar-height;
  padding: 20px;
  background: $green;
  & li {
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  @include breakpoint(destkop) {
    border-radius: $card-border-radius;
  }
}

.logout-button {
  border: none;
  background: none;
  color: $green;
  transition: all $transition-duration;
  outline: none;
  &:hover {
    color: $hover-link;
    cursor: pointer;
  }
}
</style>
