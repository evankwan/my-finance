import charts from "./charts.vue"

import { mount, enableAutoUnmount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import { useExpensesStore } from "@/store/expenses"

enableAutoUnmount(afterEach)

describe("charts.vue", () => {
  const getWrapper = () => mount(charts, {
    shallow: true,
    global: {
      plugins: [createTestingPinia()],
      stubs: ["PageHeader", "ExpensesOverTime"],
    }
  })
  it("calls the getCategories action when mounting the component", async () => {
    getWrapper();
    const expensesStore = useExpensesStore()

    expect(expensesStore.getCategories).toHaveBeenCalled()
  })
})