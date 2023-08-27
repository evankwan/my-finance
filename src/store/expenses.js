import { defineStore } from "pinia"
import { ref } from "vue"
import { getAll, getCategories as getCategoriesFromDb, add, addCategory as addCategoryToDb, updateExpense } from "@/api/ExpensesAPI"
import { formatTimestampToDate } from "@/utilities/dateHelpers"

export const useExpensesStore = defineStore("expenses", () => {
	const list = ref([])
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
			await updateExpense(expense)
			await getExpenses()
		} catch (error) {
			console.error(error)
		}
	}

	const categories = ref([])
	const getCategories = async () => {
		try {
			const result = await getCategoriesFromDb()
			categories.value = [...result]
		} catch (error) {
			console.error({ error })
		}
	}
	const addCategory = async (category) => {
		try {
			await addCategoryToDb(category)
			await getCategories()
		} catch (error) {
			console.error({ error })
		}
	}

	return {
		list,
		categories,
		getCategories,
		addCategory,
		getExpenses,
		addExpense,
		saveExpense,
	}
})
