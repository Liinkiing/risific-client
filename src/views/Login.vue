<template>
  <div class="page-login page-content">
    <vue-headful title="Risific - Connexion"/>
    <ApolloMutation :mutation="require('../graphql/mutations/LoginUserMutation.graphql')"
                    :variables="{ input: { username, password } }"
                    @done="onSuccessLogin">
      <template slot-scope="{ mutate, loading, gqlError } ">
        <form class="login-form" action="" method="post" @submit.prevent="mutate">
          <header>
            <h1>Connexion</h1>
          </header>
          <main>
            <div class="form-input input-icon">
              <icon name="user"/>
              <input autocomplete="username" name="username" type="text" v-model="username"
                     placeholder="Nom d'utilisateur...">
            </div>
            <div class="form-input input-icon">
              <icon name="lock"/>
              <input autocomplete="password" name="password" type="password" v-model="password"
                     placeholder="Mot de passe...">
            </div>

            <button class="button-primary" :disabled="loading" type="submit">
              <loader v-if="loading"/>
              <span v-else>Se connecter</span>
            </button>
            <p v-if="gqlError">{{ gqlError }}</p>
          </main>
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import { EventBus } from "../main";
import { EVENT_LOGIN } from "../constants";
import Loader from "../components/ui/Loader";

export default {
  name: "page-login",
  components: {Loader},
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

<style scoped lang="scss">
.page-login {
  margin-top: $navbar-height;
}
.login-form {
  display: flex;
  flex-direction: column;
  border-radius: $main-border-radius;
  width: 100%;
  margin: 0;
  background: white;
  @include breakpoint(tablet) {
    width: 70%;
    max-width: 700px;
    margin: 40px auto;
    @include darkerShadow();
  }
  & header {
    background: $medium-dark;
    color: $white;
    height: 70px;
    display: flex;
    justify-content: center;
    align-content: center;
    & h1 {
      margin: 0;
      line-height: 70px;
    }
    @include breakpoint(tablet) {
      border-top-left-radius: $card-border-radius;
      border-top-right-radius: $card-border-radius;
      height: 120px;
      & h1 {
        line-height: 120px;
      }
    }
  }
  & main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 20px 0 0 0;
    & button {
      box-shadow: none;
      margin-top: 20px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    & .form-input {
      width: 70%;
      margin: 16px auto;
      position: relative;
      & input {
        width: 100%;
        padding: 10px 10px 10px 60px;
        border-radius: $main-border-radius;
        border: $main-border-size solid darken($white, 5%);
        @include condensedShadow();
      }
    }
    & .input-icon {
      & svg {
        width: 30px;
        height: 100%;
        transform: scale3d(0.8, 0.8, 0.8);
        margin-left: 16px;
        display: inline-block;
        position: absolute;
      }
    }
  }
}
</style>
