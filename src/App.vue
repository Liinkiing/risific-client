<template>
    <div id="app">
        <nav class="main-navigation">
            <div class="container">
                <router-link :to="{name: 'home'}">Risific</router-link>
                <div class="pull-right">

                </div>
            </div>
        </nav>
        <main class="container">
            <router-view :key="$route.fullPath"/>
        </main>
    </div>
</template>
