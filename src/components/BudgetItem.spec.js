import BudgetItem from "./BudgetItem.vue"

import { mount, enableAutoUnmount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import { DEFAULT_DEBOUNCE_TIME } from "@/utilities/constants.js"

enableAutoUnmount(afterEach)

const defaultProps = {
	category: {
		id: 1,
		name: "budget category 1",
		expense_category: 1,
		amount: 200,
		budget_id: 1,
	},
}

const categories = [
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
]

const getWrapper = (props = defaultProps) => mount(BudgetItem, {
	shallow: true,
	global: {
		plugins: [createTestingPinia({
			initialState: {
				budgets: {
					categories: budgetCategories,
				},
				expenses: {
					categories,
				},
			}
		})],
	},
	props: {
		...defaultProps,
		...props,
	}
})

vi.useFakeTimers();

beforeEach(() => vi.clearAllMocks())

it("displays a dropdown with all the available expense categories, defaulting to the selected one for this budget category", () => {
	const wrapper = getWrapper();
	expect(wrapper.findAll("option")).toHaveLength(categories.length)
})
it("saves the budget category when updating the expense category", async() => {
	const wrapper = getWrapper();
	expect(wrapper.emitted("saveCategory")).toBeUndefined()

	const newExpenseCategory = categories[1].id;
	await wrapper.find("#edit-category-categories").setValue(newExpenseCategory)
	vi.advanceTimersByTime(DEFAULT_DEBOUNCE_TIME)
	expect(wrapper.emitted("saveCategory")).toHaveLength(1)
	expect(wrapper.emitted("saveCategory")[0][0]).toStrictEqual(
		expect.objectContaining({
			category: expect.objectContaining({
				expenseCategory: newExpenseCategory,
			}),
		}),
	)
})
it("saves the budget category when updating the budgeted amount", () => {
	const wrapper = getWrapper();
	expect(wrapper.emitted("saveCategory")).toBeUndefined()

	const newAmount = 400;
	wrapper.find("#edit-category-amount").setValue(newAmount)
	vi.advanceTimersByTime(DEFAULT_DEBOUNCE_TIME)
	expect(wrapper.emitted("saveCategory")).toHaveLength(1)
	expect(wrapper.emitted("saveCategory")[0][0]).toStrictEqual(
		expect.objectContaining({
			category: expect.objectContaining({
				amount: newAmount
			})
		})
	)
})
