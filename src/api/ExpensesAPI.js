import { invoke } from "@tauri-apps/api/tauri"

export default {
  getAll: () => {
    return invoke("expenses_get_all")
  },
  add: (payload) => {
    return invoke("expenses_add_new", payload)
  }
}