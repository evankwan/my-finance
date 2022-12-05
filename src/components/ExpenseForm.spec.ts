import ExpenseForm from "./ExpenseForm.vue"

import { mount } from "@vue/test-utils"
import type { VueWrapper } from "@vue/test-utils"
import { describe, it, expect } from "vitest"

describe("ExpenseForm", () => {
  const getWrapper = () => {
    return mount(ExpenseForm, {
      shallow: true,
    })
  }
  it("runs", () => {
    getWrapper();
    expect(true).toBe(true);
  })
})