import { createMemoryHistory, createRouter } from "vue-router"

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../pages/expenses-list.vue"),
    meta: {
      title: "Expenses",
    },
  },
  {
    name: "categories",
    path: "/categories",
    component: () => import("../pages/categories.vue"),
    meta: {
      title: "Categories",
    },
  },
  {
    name: "monthly-recap",
    path: "/monthly-recap",
    component: () => import("../pages/monthly-recap.vue"),
    meta: {
      title: "Monthly recap",
    },
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})