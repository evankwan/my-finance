import ExpensesController from "./controllers/ExpensesController"
import { Expense } from "../types/Expense"

export default {
  get: (route: string) => {
    let result;
    switch (route) {
      case "expenses/all":
        result = ExpensesController.getExpenses()
        break
      default:
        break
    }
    return result;
  },
  post: (route: string, payload: { expense: Expense }) => {
    let result;
    switch (route) {
      case "expenses/new":
        result = ExpensesController.addExpense(payload)
        break
      default:
        break
    }
    return result;
  }
}