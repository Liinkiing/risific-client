<template>
    <main class="container not-found-page">
      <vue-headful title="Risific - Page non trouvée"/>
      <h1>404 - Not found</h1>
      <div class="row centered">
        <img class="responsive-image" src="https://media1.tenor.com/images/be14c627a8adc704b0582c23f582b255/tenor.gif?itemid=6142116" alt="Issou">
      </div>
      <div class="row centered">
        <router-link class="button button-primary" :to="{name: 'home'}"><icon name="arrow-left"/>&nbsp;Retourner à l'accueil</router-link>
      </div>
    </main>
</template>

<script>
export default {
  name: "not-found"
};
</script>
<style lang="scss" scoped>
</style>
