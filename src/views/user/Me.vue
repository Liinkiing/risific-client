<template>
    <main class="container page-my-profile">
      <ViewerQuery>
        <div slot-scope="{ viewer }" :user="viewer">
          <user-info :user="viewer"></user-info>
          <h2>Vos favoris</h2>
          <user-favorite-list :favorites="viewer.favorites"></user-favorite-list>
          <h2>Vos préférences</h2>
          <h3>Thème</h3>
          <user-theme-picker :viewer-preference="viewer.preference"/>
        </div>
      </ViewerQuery>
    </main>
    
</template>

<script>
import ViewerQuery from "../../components/graphql/ViewerQuery";
import UserInfo from "../../components/ui/user/UserInfo";
import UserFavoriteList from "../../components/ui/user/UserFavoriteList";
import AuthManager from "../../managers/AuthManager";
import { LOGIN_ROUTE } from "../../router/routes";
import UserThemePicker from "../../components/ui/user/UserThemePicker";
export default {
  name: "Me",
  components: { UserThemePicker, UserFavoriteList, UserInfo, ViewerQuery },
  beforeRouteEnter(to, from, next) {
    if (!AuthManager.isLoggedIn()) {
      next({ name: LOGIN_ROUTE });
    }
    next();
  }
};
</script>

<style lang="scss">
</style>
