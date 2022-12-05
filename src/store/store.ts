import { defineStore } from "pinia"
import { Expense } from "../types/Expense"
import ExpensesAPI from "../api/api"

export const useExpensesStore = defineStore("database", {
  state: () => ({
    expenses: [],
  }),
  actions: {
    getExpenses: () => {
      console.log("test")
    },
    add: async (payload: { expense: Expense }) => {
      try {
        const result = ExpensesAPI.post("expenses/new", payload)
        console.log({ result })
      } catch (error) {
        console.error(error)
      }

    }
  }
})