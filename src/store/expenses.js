import { defineStore } from "pinia"
import { ref } from "vue"
import ExpensesAPI from "../api/ExpensesAPI"

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
  const add = async ({ expense }) => {
    try {
      await ExpensesAPI.add({ expense })
      list.value = [
        ...list.value,
        expense
      ]
    } catch (error) {
      console.error({ error })
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
