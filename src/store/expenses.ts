import { defineStore } from "pinia"
import { Expense } from "../types/Expense"
import ExpensesAPI from "../api/ExpensesAPI"
import { ref } from "vue"
import type { Ref } from "vue"

export const useExpensesStore = defineStore("expenses", () => {
  const list: Ref = ref([]);

  const getExpenses = async () => {
    try {
      const result = await ExpensesAPI.getAll()
      console.log({ result })
    } catch (error) {
      console.error({ error })
    }
  }
  const add = async (payload: { expense: Expense }) => {
    try {
      // const result: Expense = await ExpensesAPI.add(payload)
      list.value = [
        ...list.value,
        payload.expense
      ]
      console.log(list.value)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    list,
    getExpenses,
    add,
  }
})