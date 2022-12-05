import db from "../database/Database"
import type { Expense } from "../../types/Expense";

export default {
  getAll: async () => {
    try {
      const data: Expense[] = await db.getData("/expenses")
      return [data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  add: async (expense: Expense) => {
    try {
      const data = await db.push("/expenses/", expense)
      return [data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  }
}