import ExpenseForm from "./ExpenseForm.vue"

import { mount, flushPromises } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import { formatDateToTimestamp } from "@/utilities/dateHelpers"
import { useExpensesStore } from "@/store/expenses"

describe("ExpenseForm", () => {
	const getWrapper = () => {
		return mount(ExpenseForm, {
			shallow: true,
			global: {
				plugins: [createTestingPinia()]
			}
		})
	}

	it("adds a new expense to the store when submitting the form", async () => {
		const wrapper = getWrapper()

		const expectedData = {
			date: formatDateToTimestamp("2022-12-05"),
			cost: String(100.34),
			title: "Leafs Jersey",
			category: 1,
			id: 1,
		}

		await wrapper.find("#date-input").setValue(expectedData.date)
		await wrapper.find("#title-input").setValue(expectedData.title)
		await wrapper.find("#cost-input").setValue(expectedData.cost)

		await wrapper.find("#expense-form").trigger("submit")

		const expensesStore = useExpensesStore()
		expect(expensesStore.addExpense).toHaveBeenCalledWith(
			expect.objectContaining(expectedData)
		);
	})
	it("clears the form after the form is submitted", async () => {
		const wrapper = getWrapper()
		const $dateInput = wrapper.find("#date-input")
		const $titleInput = wrapper.find("#title-input")
		const $costInput = wrapper.find("#cost-input")

		await $dateInput.setValue("2022-12-05")
		await $titleInput.setValue("Leafs Jersey")
		await $costInput.setValue("100.34")
		await wrapper.find("#expense-form").trigger("submit")
		await flushPromises()

		expect($dateInput.element.value).toBe("2022-12-05")
		expect($titleInput.element.value).toBe("")
		expect(Number($costInput.element.value)).toBe(0)
	})
	it("validates form values and shows error messages if there is no expense title", async () => {
		const wrapper = getWrapper()
		const $form = wrapper.find("#expense-form")
		$form.trigger("submit")
		await flushPromises()

		const $errorContainer = wrapper.find("#error-messages-container")
		const $errorMessages = $errorContainer.findAll("p")
		expect($errorContainer.isVisible()).toBe(true)
		expect($errorMessages).toHaveLength(1)
	})
	it("validates form values and shows an error message if the expense cost is not a number", async () => {
		const wrapper = getWrapper()
		const $form = wrapper.find("#expense-form")
		const $costInput = wrapper.find("#cost-input")

		await $costInput.setValue("not a number")
		$form.trigger("submit")
		await flushPromises()

		const $errorMessages = wrapper.findAll(".error-message")
		expect($errorMessages.at(0)?.text()).toContain("Your expense name field must have at least 1 character")
	})
})
