import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("../pages/welcome.vue") },
  { path: "/expenses", component: () => import("../pages/expenses.vue") }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router