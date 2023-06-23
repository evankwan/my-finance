import { defineStore } from "pinia"
import { ref } from "vue"

import { getList, getBudgetCategories } from "@/api/BudgetsApi"

export const useBudgetsStore = defineStore("budgets", () => {
  const budgets = ref([])
  const getBudgets = async () => {
    try {
      const result = await getList()
      budgets.value = result
    } catch (error) {
      console.error({ error })
    }
    finally {
      return budgets
    }
  }

  const getCategories = async (id) => {
    try {
      const result = await getBudgetCategories(id)
      console.log(result)
      return result
    } catch (error) {
      console.error({ error })
    }
  }

  return {
    budgets,
    getBudgets,
    getCategories,
  }
})
