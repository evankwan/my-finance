import { createApp } from "vue"
import { createPinia } from "pinia"
import PrimeVue from "primevue/config"
import Aura from "@primevue/themes/aura"

import "./style.css"
import App from "./App.vue"

const init = () => {
  const pinia = createPinia()
  const app = createApp(App)

  app.use(pinia)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: "system",
      }
    }
  })
  app.mount("#app")
}
init()
