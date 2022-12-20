import ExpensesHeader from "./ExpensesHeader.vue"

import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"

describe("ExpensesHeader", () => {
  const getWrapper = () => {
    return mount(ExpensesHeader, {
      shallow: true,
    });
  }
  it("runs", () => {
    getWrapper();
    expect(true).toBe(true);
  })
})