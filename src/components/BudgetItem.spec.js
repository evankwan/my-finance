import BudgetItem from "./BudgetItem.vue"

import { mount, enableAutoUnmount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

enableAutoUnmount(afterEach)

const defaultProps = {
	category: {
		id: 4,
		name: "budget category 1",
		expense_category: 1
	},
}

const categories = [
	{ id: 1, name: "category 1" },
	{ id: 2, name: "category 2" },
	{ id: 3, name: "category 3" },
]

const getWrapper = (props = defaultProps) => mount(BudgetItem, {
	shallow: true,
	global: {
		plugins: [createTestingPinia({
			initialState: {
				expenses: {
					categories,
				}
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
it("saves the budget category when updating the expense category", () => {
	const wrapper = getWrapper();
	expect(wrapper.emitted("saveCategory")).toBeUndefined()

	wrapper.find("#edit-category-categories").trigger("change")
	vi.advanceTimersByTime(301)
	expect(wrapper.emitted("saveCategory")).toHaveLength(1)
})
it("saves the budget category when updating the budgeted amount", () => {
	const wrapper = getWrapper();
	expect(wrapper.emitted("saveCategory")).toBeUndefined()
	
	wrapper.find("#edit-category-amount").trigger("input")
	vi.advanceTimersByTime(301)
	expect(wrapper.emitted("saveCategory")).toHaveLength(1)
})
