import expenses from "./expenses.vue"

import { mount } from "@vue/test-utils"
import type { VueWrapper } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import { describe, it, expect } from "vitest"

describe("expenses.vue", () => {
  const getWrapper = () => {
    return mount(expenses, {
      shallow: true,
      global: {
        plugins: [createTestingPinia()],
        stubs: ["ExpensesHeader", "ExpenseForm"]
      }
    })
  }
  it("renders the expenses header and form", () => {
    const wrapper: VueWrapper = getWrapper()
    const $header = wrapper.find("#expenses-header")
    const $form = wrapper.find("#expenses-form")

    expect($header.exists()).toBe(true)
    expect($form.exists()).toBe(true)
  })
})
