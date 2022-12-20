import { defineStore } from "pinia"
import ExpensesAPI from "../api/ExpensesAPI"
import { ref } from "vue"

export const useExpensesStore = defineStore("expenses", () => {
  const list = ref([]);

  const getExpenses = async () => {
    try {
      const result = await ExpensesAPI.getAll()
      console.log({ result })
    } catch (error) {
      console.error({ error })
    }
  }
  const add = async (payload) => {
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

  const saveExpense = async (index, expense) => {
    try {
      list.value[index] = expense
      console.log(list.value[index])
    } catch (error) {
      console.error(error)
    }
  }

  return {
    list,
    getExpenses,
    add,
    saveExpense,
  }
})