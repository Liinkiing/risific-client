<template>
  <div class="home-page">
    <vue-headful title="Risific - Liste des risifics"/>
    <h1>Liste des risifics</h1>
    <risific-list/>
  </div>
</template>

<script>
import RisificList from "../components/risific/RisificList";
import { mapState } from "vuex";
import { EventBus } from "../main";
import { EVENT_LOGOUT } from "../constants";

export default {
  name: "home",
  components: { RisificList },
  computed: {
    ...mapState("user", ["isLoggedIn"])
  },
  methods: {
    logout() {
      EventBus.$emit(EVENT_LOGOUT);
    }
  }
};
</script>
