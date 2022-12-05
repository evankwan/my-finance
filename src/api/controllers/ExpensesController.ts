import Expenses from "../models/Expenses"
import type { Expense } from "../../types/Expense"

export default {
  getExpenses: () => {
    const expenses = Expenses.getAll()
    return expenses
  },
  addExpense: (payload: { expense: Expense }) => {
    const { expense } = payload
    const result = Expenses.add(expense)

  }
}