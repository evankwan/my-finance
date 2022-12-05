import { defineStore } from "pinia"
import { Expense } from "../types/Expense"
import ExpensesAPI from "../api/ExpensesAPI"

export const useExpensesStore = defineStore("expenses", {
  state: () => ({
    list: [],
  }),
  actions: {
    getExpenses: async () => {
      try {
        const result = await ExpensesAPI.getAll()
        console.log({ result })
      } catch (error) {
        console.error({ error })
      }
    },
    add: async (payload: { expense: Expense }) => {
      try {
        console.log("test")
        const result: Expense = await ExpensesAPI.add(payload)
        this.list.concat([result])
        console.log({ result })
      } catch (error) {
        console.error(error)
      }

    }
  }
})