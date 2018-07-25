<template>
    <div class="page-login">
      <vue-headful title="Risific - Connexion"/>
      <h1>Je suis le login</h1>
      <div class="page-content">
        <form action="" method="post" @submit="$event.preventDefault()">
          <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                          :variables="{ input: { username, password } }"
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
        </form>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "../main";
import { EVENT_LOGIN } from "../constants";
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
    onSuccessLogin({
      data: {
        loginUser: { token, refreshToken }
      }
    }) {
      EventBus.$emit(EVENT_LOGIN, { token, refreshToken });
    }
  }
};
</script>

<style lang="scss">
</style>
