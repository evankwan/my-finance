import { setActivePinia, createPinia } from "pinia"
import { describe, expect, it, beforeEach } from "vitest"
import { flushPromises } from "@vue/test-utils"
import { useExpensesStore } from "./expenses"

import type { Expense } from "../types/Expense"

describe("expenses store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe("actions", () => {
    describe("add", () => {
      const expense: Expense = {
        id: 1,
        category: "uncategorized",
        cost: 34.16,
        date: "2022-12-25",
        title: "Leafs Sweater"
      }
      it("adds an expense to the list", async () => {
        const expenses = useExpensesStore()
        expect(expenses.list).toHaveLength(0)
        await expenses.add({ expense })
        await flushPromises()
        expect(expenses.list).toHaveLength(1)
      })
    })
  })
})