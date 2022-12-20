import { defineStore } from "pinia"
import ExpensesAPI from "../api/ExpensesAPI"
import { ref } from "vue"

export const useExpensesStore = defineStore("expenses", () => {
  const list = ref([])
  const categories = ref([])

  const getExpenses = async () => {
    try {
      const result = await ExpensesAPI.getAll()
      list.value = [...result]
    } catch (error) {
      console.error({ error })
    }
  }
  const getCategories = async () => {
    try {
      const result = await ExpensesAPI.getCategories()
      categories.value = [...result]
    } catch (error) {
      console.error({ error })
    }
  }
  const add = async (payload) => {
    try {
      const result = await ExpensesAPI.add(payload)
      console.log({ result })
      list.value = [
        ...list.value,
        payload.expense
      ]
    } catch (error) {
      console.error(error)
    }
  }

  const saveExpense = async ({ expense }) => {
    try {
      const index = list.value.findIndex((e) => e.id === expense.id)
      list.value.splice(index, 1, expense)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    list,
    categories,
    getCategories,
    getExpenses,
    add,
    saveExpense,
  }
})