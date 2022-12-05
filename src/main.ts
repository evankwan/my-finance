import { createApp } from "vue"
import type { App as AppType } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router/router"
import { createPinia } from "pinia"

const app: AppType = createApp(App)
app.use(router)

const pinia = createPinia()
app.use(pinia)
app.mount("#app");
