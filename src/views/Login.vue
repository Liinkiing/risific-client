<template>
  <div class="page-login">
    <vue-headful title="Risific - Connexion"/>
    <h1>Je suis le login</h1>
    <div class="page-content">
      <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                      :variables="{ input: { username, password } }"
                      @done="onSuccessLogin">
        <template slot-scope="{ mutate, loading, gqlError } ">
          <form action="" method="post" @submit.prevent="mutate">
            <div class="form-input">
              <input autocomplete="username" name="username" type="text" v-model="username"
                     placeholder="Nom d'utilisateur...">
            </div>
            <div class="form-input">
              <input autocomplete="password" name="password" type="password" v-model="password"
                     placeholder="Mot de passe...">
            </div>
            <div class="form-input">
              <button :disabled="loading" type="submit">Se connecter</button>
              <p v-if="gqlError">{{ gqlError }}</p>
            </div>
          </form>
        </template>
      </ApolloMutation>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main";
import { EVENT_LOGIN } from "../constants";

export default {
  name: "page-login",
  data() {
    return {
      username: "",
      password: "",
      referrer: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.referrer = from;
    });
  },
  methods: {
    onSuccessLogin({
      data: {
        loginUser: { token, refreshToken }
      }
    }) {
      EventBus.$emit(EVENT_LOGIN, {
        token,
        refreshToken,
        referrer: this.referrer
      });
    }
  }
};
</script>

<style lang="scss">
</style>
