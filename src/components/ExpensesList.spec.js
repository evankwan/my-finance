import { describe, it, expect } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import ExpensesList from "./ExpensesList.vue"
import { formatDateToTimestamp } from "../utilities/dateHelpers"

import { useExpensesStore } from "../store/expenses"

describe("ExpensesList", () => {
  const getWrapper = () => {
    return mount(ExpensesList, {
      shallow: true,
      global: {
        plugins: [createTestingPinia({
          initialState: {
            expenses: {
              list: [expense]
            }
          }
        })]
      }
    })
  }
  const expense = {
    id: 1,
    category: "uncategorized",
    cost: 34.16,
    date: formatDateToTimestamp(new Date()),
    title: "Leafs Sweater"
  }
  it("adds a list item for each item in the expenses list", async () => {
    const wrapper = getWrapper()
    const expensesStore = useExpensesStore()
    const $expenses = wrapper.findAll(".expense-item")
    expect($expenses.length).not.toBe(0)
    expect($expenses.length).toBe(expensesStore.list.length)
  })
}) 
