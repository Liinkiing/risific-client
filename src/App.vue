<template>
  <div id="app">
    <vue-headful title="Risific"/>
    <app-header/>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>
<script>
import AppHeader from "./components/ui/AppHeader";
export default {
  components: { AppHeader }
};
</script>
