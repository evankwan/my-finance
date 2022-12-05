import { invoke } from "@tauri-apps/api/tauri"
import { Expense } from "../types/Expense"

export default {
  getAll: () => {
    return invoke("expenses_get_all")
  },
  add: (payload: { expense: Expense }) => {
    return invoke("expenses_add_new", payload)
  }
}