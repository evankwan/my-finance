import { defineStore } from "pinia"
import { ref, computed, nextTick, reactive } from "vue"
import { format } from "date-fns"

import { getAll, add, remove } from "../api/ExpensesAPI"
import type { AddExpensePayload, ExpenseFiltersConfig } from "../types/expenses"
import { UNCATEGORIZED } from "../utilities/constants"

export const useExpensesStore = defineStore("expenses", () => {
  // state
  const _expenses = ref([])
  const _expensesFilters = reactive<ExpenseFiltersConfig>({
    month: null,
  })

  // actions
  const getExpenses = async() => {
    const res = await getAll()
    _expenses.value = res
    await nextTick()
    return expenses.value
  }

  const addExpense = async (expense: AddExpensePayload) => {
    const newExpense = await add(expense)
    return newExpense
  }

  const removeExpense = async (expenseId: number) => {
    await remove(expenseId)
    return
  }

  const setExpensesFilters = (filters: ExpenseFiltersConfig = {}) => {
    Object.keys(filters).forEach((filter) => {
      _expensesFilters[filter] = filters[filter];
    })
  }

  // getters
  const expenses = computed(() => {
    const formattedExpenses = _expenses.value.map((expense: any) => ({
      ...expense,
      date: format(new Date(expense.date), "yyyy, MMM dd"),
      cost: expense.cost.toFixed(2),
      category: expense.category.id ? expense.category : UNCATEGORIZED,
    }))
    return formattedExpenses
  })
  const expensesMonthFilter = computed<number | null | undefined>(() => _expensesFilters.month)
  const expensesFilteredByMonth = computed(() => {
    return
  })

  return {
    expenses,
    getExpenses,
    addExpense,
    removeExpense,
    setExpensesFilters,
    expensesMonthFilter,
    expensesFilteredByMonth,
  }
})
