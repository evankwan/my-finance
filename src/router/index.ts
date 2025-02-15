import { createMemoryHistory, createRouter } from "vue-router"

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../pages/expenses-list.vue"),
  },
  {
    name: "categories",
    path: "/categories",
    component: () => import("../pages/categories.vue"),
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})