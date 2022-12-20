import { createRouter, createWebHashHistory } from "vue-router"
import welcome from "../pages/welcome.vue"
import expenses from "../pages/expenses.vue"

const routes = [
  { path: "/", component: welcome },
  { path: "/expenses", component: expenses }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router