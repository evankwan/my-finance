import { defineStore } from "pinia"
import { ref } from "vue"

import { getList, getBudgetCategories, addCategory } from "@/api/BudgetsApi"

export const useBudgetsStore = defineStore("budgets", () => {
	const budgets = ref([])
	const getBudgets = async () => {
		try {
			const result = await getList()
			budgets.value = result
		} catch (error) {
			console.error({ error })
		} finally {
			return budgets.value
		}
	}

	const categories = ref([])
	const getCategories = async (id) => {
		try {
			const result = await getBudgetCategories(id)
			categories.value = result;
		} catch (error) {
			console.error({ error })
		} finally {
			return categories.value
		}
	}
	const saveCategory = async (id, category) => {
		try {
			const categoryToAdd = {
				...category,
				budget_id: id,
			}
			await addCategory(categoryToAdd)
			await getCategories(id)
		} catch (error) {
			console.error({ error })
		} finally {
			return categories.value
		}
	}

	return {
		budgets,
		getBudgets,
		categories,
		getCategories,
		saveCategory,
	}
})
