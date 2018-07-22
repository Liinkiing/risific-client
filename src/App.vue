<template>
  <div id="app">
    <vue-headful title="Risific"/>
    <nav class="main-navigation">
      <div class="container">
        <router-link :to="{name: 'home'}">Risific</router-link>
        <div class="pull-right">

        </div>
      </div>
    </nav>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>
