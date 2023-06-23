import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App.vue"
import router from "@/router/router"

import "@/assets/css/style.css"

const app = createApp(App)
app.use(router)

const pinia = createPinia()
app.use(pinia)
app.mount("#app");
