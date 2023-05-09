import { defineStore } from "pinia"
import { ref } from "vue"
import { getAll, getCategories as getCategoriesFromDb, add } from "@/api/ExpensesAPI"
import { formatTimestampToDate } from "@/utilities/dateHelpers"

export const useExpensesStore = defineStore("expenses", () => {
  const list = ref([])
  const categories = ref([])

  const getExpenses = async () => {
    try {
      const result = await getAll()
      const formattedExpenses = result.map((expense) => ({
        ...expense,
        date: formatTimestampToDate(expense.date)
      }))
      list.value = [...formattedExpenses]
    } catch (error) {
      console.error({ error })
    }
  }
  const getCategories = async () => {
    try {
      const result = await getCategoriesFromDb()
      categories.value = [...result]
    } catch (error) {
      console.error({ error })
    }
  }
  const addExpense = async (expense) => {
    try {
      await add(expense)
      list.value.push({
        ...expense,
        date: formatTimestampToDate(expense.date)
      })
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
    addExpense,
    saveExpense,
  }
})
