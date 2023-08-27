import BudgetWrapper from "./BudgetWrapper.vue"

import { mount, enableAutoUnmount, flushPromises } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import { DEFAULT_BUDGET_ID } from "@/utilities/constants.js"
import { useBudgetsStore } from "@/store/budgets"

enableAutoUnmount(afterEach)

const expenseCategories = [
	{ id: 1, name: "category 1" },
	{ id: 2, name: "category 2" },
	{ id: 3, name: "category 3" },
]
const budgetCategories = [
	{
		amount: 200,
		budget_id: 1,
		expense_category: 1,
		id: 1,
		name: "budget category 1",
	},
	{
		amount: 150,
		budget_id: 1,
		expense_category: 2,
		id: 2,
		name: "budget category 2",
	},
]

const currentBudget = {
	id: DEFAULT_BUDGET_ID,
	name: "Mock Budget",
}

const getWrapper = () => mount(BudgetWrapper, {
	shallow: true,
	global: {
		plugins: [createTestingPinia({
			initialState: {
				budgets: {
					budgets: [currentBudget],
					categories: budgetCategories,
				},
				expenses: {
					categories: expenseCategories,
				},
			}
		})],
	},
})

beforeEach(() => vi.clearAllMocks())

it("displays the budget name", async() => {
	const wrapper = getWrapper()
	await flushPromises()
	expect(wrapper.find("#budget-name").text()).toContain(currentBudget.name)
})
it("adds a new budget category with the chosen category and input amount", async() => {
	const wrapper = getWrapper()
	const { saveCategory } = useBudgetsStore()
	await flushPromises()

	const newCategory = expenseCategories[2].id
	const newAmount = 1000
	await wrapper.find("#new-category-categories").setValue(newCategory)
	await wrapper.find("#new-category-amount").setValue(newAmount)
	await wrapper.find("#add-category-button").trigger("click")

	expect(saveCategory).toHaveBeenCalledWith(
		currentBudget.id,
		expect.objectContaining({
			expenseCategory: newCategory,
			amount: newAmount,
		})
	)
})
it("resets the category form after submitting a new budget category", async() => {
	const wrapper = getWrapper()
	await flushPromises()

	const newCategory = expenseCategories[2].id
	const newAmount = 1000
	await wrapper.find("#new-category-categories").setValue(newCategory)
	await wrapper.find("#new-category-amount").setValue(newAmount)
	await wrapper.find("#add-category-button").trigger("click")

	expect(wrapper.find("#new-category-categories").wrapperElement.value).toEqual("1");
	expect(wrapper.find("#new-category-amount").wrapperElement.value).toBe("0");
})
it("does not save a category if that category has already been added to the budget", async() => {
	const wrapper = getWrapper()
	const { saveCategory } = useBudgetsStore()
	await flushPromises()

	const alreadyUsedCategory = expenseCategories[1].id
	const newCategory = expenseCategories[2].id
	const newAmount = 1000
	wrapper.find("#new-category-categories").setValue(alreadyUsedCategory)
	await wrapper.find("#new-category-amount").setValue(newAmount)
	await wrapper.find("#add-category-button").trigger("click")

	expect(saveCategory).not.toHaveBeenCalled()

	await wrapper.find("#new-category-categories").setValue(newCategory)
	await wrapper.find("#add-category-button").trigger("click")
	expect(saveCategory).toHaveBeenCalled()
})
it("updates the category when the budget items emit save-category", async() => {
	const wrapper = getWrapper()
	const { updateCategory, getCategories } = useBudgetsStore()
	await flushPromises()
	wrapper.find("#category-1").trigger("save-category")
	await flushPromises()
	expect(updateCategory).toHaveBeenCalled()
	expect(getCategories).toHaveBeenCalled()
})
it("displays the total budgetted amount", async() => {
	const expectedTotal = budgetCategories.reduce((acc, { amount }) => acc + amount, 0)
	const wrapper = getWrapper()
	await flushPromises()
	expect(wrapper.find("#total-budget").text()).toContain(expectedTotal)
})
