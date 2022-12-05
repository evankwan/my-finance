import expenses from "./expenses.vue"

import { mount } from "@vue/test-utils"
import type { VueWrapper } from "@vue/test-utils"
import { describe, it, expect } from "vitest"

describe("expenses.vue", () => {
  it("displays a title", () => {
    const wrapper: VueWrapper = mount(expenses)
    const $title = wrapper.find("#expenses-title")

    expect($title.text()).toBe("Expenses")
  })
})
