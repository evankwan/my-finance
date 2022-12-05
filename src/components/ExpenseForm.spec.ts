import ExpenseForm from "./ExpenseForm.vue"

import { mount, flushPromises } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { createTestingPinia } from "@pinia/testing"
import type { VueWrapper } from "@vue/test-utils"

import { useExpensesStore } from "../store/store"

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
    const wrapper: VueWrapper = getWrapper()
    const expectedData: any = {
      date: "2022-12-05",
      cost: 100.34,
      title: "Leafs Jersey",
      category: "uncategorized",
      id: 1,
    }

    await wrapper.find("#date-input").setValue(expectedData.date)
    await wrapper.find("#title-input").setValue(expectedData.title)
    await wrapper.find("#cost-input").setValue(expectedData.cost)

    await wrapper.find("#expense-form").trigger("submit")

    const expensesStore = useExpensesStore()
    expect(expensesStore.add).toHaveBeenCalledWith(
      expect.objectContaining({
        expense: expect.objectContaining(expectedData)
      })
    );
  })

  it("clears the form after the form is submitted", async () => {
    const wrapper: VueWrapper = getWrapper()
    const $dateInput = wrapper.find("#date-input")
    const $titleInput = wrapper.find("#title-input")
    const $costInput = wrapper.find("#cost-input")

    await $dateInput.setValue("2022-12-05")
    await $titleInput.setValue("Leafs Jersey")
    await $costInput.setValue(100.34)
    await wrapper.find("#expense-form").trigger("submit")
    await flushPromises()

    expect($dateInput.element.value).toBe("2022-12-05")
    expect($titleInput.element.value).toBe("")
    expect(Number($costInput.element.value)).toBe(0)
  })
})