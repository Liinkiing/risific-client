import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Me from "../views/user/Me";
import ChapterView from "../views/risific/ChapterView.vue";
import RisificView from "../views/risific/RisificView.vue";
import NotFound from "../views/NotFound.vue";

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";
export const ME_ROUTE = "me";
export const RISIFIC_VIEW_ROUTE = "risific.view";
export const CHAPTER_VIEW_ROUTE = "chapter.view";
export const NOT_FOUND_ROUTE = "not-found";

export const routes = [
  {
    path: "/",
    name: HOME_ROUTE,
    component: Home
  },
  {
    path: "/login",
    name: LOGIN_ROUTE,
    component: Login
  },
  {
    path: "/me",
    name: ME_ROUTE,
    component: Me
  },
  {
    path: "/risific/:slug",
    name: RISIFIC_VIEW_ROUTE,
    component: RisificView,
    props: true,
    children: [
      {
        path: ":chapterNumber(\\d+)",
        name: CHAPTER_VIEW_ROUTE,
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
    name: NOT_FOUND_ROUTE,
    component: NotFound
  }
];
