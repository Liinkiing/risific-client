import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ChapterView from "./views/risific/ChapterView.vue";
import RisificView from "./views/risific/RisificView.vue";
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
      path: "/risific/:slug",
      name: "risific.view",
      component: RisificView,
      props: true,
      children: [
        {
          path: ":chapterNumber(\\d+)",
          name: "chapter.view",
          component: ChapterView,
          props: route => ({
            risificSlug: route.params.slug,
            chapterNumber: Number.parseInt(route.params.chapterNumber)
          })
        }
      ]
    },
    {
      path: "*",
      name: "not-found",
      component: NotFound
    }
  ]
});
