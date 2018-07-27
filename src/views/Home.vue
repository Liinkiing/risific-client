<template>
  <main class="container">
    <div class="home-page">
      <vue-headful title="Risific - Liste des risifics"/>
      <h1>Liste des risifics</h1>
      <risific-list/>
    </div>
  </main>
</template>

<script>
import RisificList from "../components/risific/RisificList";

export default {
  name: "home",
  components: { RisificList }
};
</script>
