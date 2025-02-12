import { defineStore } from "pinia"
import { ref, computed, nextTick } from "vue"
import { format } from "date-fns"

import { getAll, add, getCategories, remove } from "../api/ExpensesApi.js"

export const useExpensesStore = defineStore("expenses", () => {
  const _expenses = ref([])
  const getExpenses = async() => {
    const res = await getAll()
    _expenses.value = res
    await nextTick()
    return expenses.value
  }
  const expenses = computed(() => {
    const formattedExpenses = _expenses.value.map((expense: any) => ({
      ...expense,
      date: format(new Date(expense.date), "yyyy, MMM dd"),
      cost: expense.cost.toFixed(2)
    }))
    return formattedExpenses
  })
  const addExpense = async (expense: any) => {
    const newExpense = await add(expense)
    return newExpense
  }
  const removeExpense = async (expenseId: number) => {
    await remove(expenseId)
    return
  }

  const _categories = ref([])
  const categories = computed(() => _categories.value)
  const getAllCategories = async() => {
    const res = await getCategories()
    _categories.value = res
    return _categories.value
  }

  return {
    expenses,
    getExpenses,
    getAllCategories,
    categories,
    addExpense,
    removeExpense,
  }
})
