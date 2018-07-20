import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ChapterView from "./views/risific/ChapterView.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/risific/:slug/:chapter(\\d+)",
      name: "chapter.view",
      component: ChapterView,
      props: route => ({
        slug: route.params.slug,
        chapter: Number.parseInt(route.params.chapter)
      })
    },
    {
      path: "*",
      name: "not-found",
      component: NotFound
    }
  ]
});
