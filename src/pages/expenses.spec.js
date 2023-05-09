import expenses from "./expenses.vue"

import { mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

describe("expenses.vue", () => {
  const getWrapper = () => {
    return mount(expenses, {
      shallow: true,
      global: {
        plugins: [createTestingPinia()],
        stubs: ["PageHeader", "ExpenseForm"]
      }
    })
  }
  it("renders the expenses header and form", () => {
    const wrapper = getWrapper()
    const $header = wrapper.find("#expenses-header")
    const $form = wrapper.find("#expenses-form")

    expect($header.exists()).toBe(true)
    expect($form.exists()).toBe(true)
  })
})
