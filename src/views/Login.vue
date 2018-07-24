<template>
    <div class="page-login">
      <vue-headful title="Risific - Connexion"/>
      <h1>Je suis le login</h1>
      <div class="page-content">
        <form action="" method="post" @submit="$event.preventDefault()">
          <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                          :variables="{ username, password }"
                          @done="onSuccessLogin">
            <template slot-scope="{ mutate, loading, gqlError } ">
              <div class="form-input">
                <input autocomplete="username" name="username" type="text" v-model="username" placeholder="Nom d'utilisateur...">
              </div>
              <div class="form-input">
                <input autocomplete="password" name="password" type="password" v-model="password" placeholder="Mot de passe...">
              </div>
              <div class="form-input">
                <button v-if="!isLoggedIn" :disabled="loading" @click="mutate()">Se connecter</button>
                <p v-if="gqlError">{{ gqlError.message }}</p>
              </div>
            </template>
          </ApolloMutation>
          <div class="form-input">
            <button v-if="isLoggedIn" @click="logout">Se déconnecter</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { onLogin, onLogout } from "../vue-apollo";
import { SET_LOGGED_IN } from "../store/modules/user/mutations";
export default {
  name: "page-login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapState("user", ["isLoggedIn"])
  },
  methods: {
    ...mapMutations("user", [SET_LOGGED_IN]),
    async onSuccessLogin({
      data: {
        loginUser: { token }
      }
    }) {
      await onLogin(this.$apolloProvider.defaultClient, token);
      this[SET_LOGGED_IN](true);
    },
    async logout() {
      await onLogout(this.$apolloProvider.defaultClient);
      this[SET_LOGGED_IN](false);
    }
  }
};
</script>

<style lang="scss">
</style>
