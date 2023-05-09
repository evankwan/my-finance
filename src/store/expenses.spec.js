import { setActivePinia, createPinia } from "pinia"
import { flushPromises } from "@vue/test-utils"
import { useExpensesStore } from "./expenses"
import { add, getAll } from "@/api/ExpensesAPI"
import { formatDateToTimestamp } from "@/utilities/dateHelpers"

vi.mock("@/api/ExpensesAPI", () => ({
  add: vi.fn(),
  getAll: vi.fn(() => {
    const date = new Date(2024, 3, 23)
    const timestamp = formatDateToTimestamp(date)
    return [
      { id: 1, date: timestamp },
      { id: 2, date: timestamp },
      { id: 3, date: timestamp },
    ]
  })
}))

describe("expenses store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe("actions", () => {
    describe("getExpenses", () => {
      beforeEach(() => vi.clearAllMocks())
      it("fetches all the expenes from the ExpensesAPI, formats the date, and sets the list state", async () => {
        const expectedDate = new Date(2024, 3, 23)
        const expenses = useExpensesStore()
        await expenses.getExpenses()
        expect(getAll).toHaveBeenCalled()
        expect(expenses.list).toEqual(
          expect.arrayContaining([
            { id: 1, date: expectedDate },
            { id: 2, date: expectedDate },
            { id: 3, date: expectedDate },
          ])
        )
      })
      it("console errors in the event of an error", async () => {
        const mockError = "error"
        vi.spyOn(console, "error").mockImplementation(vi.fn())
        getAll.mockRejectedValue(mockError)
        const expenses = useExpensesStore()
        await expenses.getExpenses()
        expect(console.error).toHaveBeenCalledWith(
          expect.objectContaining({ error: mockError })
        )
      })
    })
    describe("add", () => {
      const expense = {
        id: 1,
        category: "uncategorized",
        cost: 34.16,
        date: "2022-12-25",
        title: "Leafs Sweater"
      }
      it("adds an expense to the list", async () => {
        const expenses = useExpensesStore()
        expect(expenses.list).toHaveLength(0)
        await expenses.addExpense({ expense })
        expect(add).toHaveBeenCalledWith(
          expect.objectContaining({ expense })
        )

        await flushPromises()
        expect(expenses.list).toHaveLength(1)
      })
      it("catches errors with a console.error", async () => {
        const mockError = "error"
        vi.spyOn(console, "error").mockImplementation()
        add.mockRejectedValue(mockError)
        const expenses = useExpensesStore()
        await expenses.addExpense({ expense })

        await flushPromises()
        expect(console.error).toHaveBeenCalledWith(
          expect.objectContaining({ error: mockError })
        )
      })
    })
  })
})
