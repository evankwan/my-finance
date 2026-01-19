import type { Category } from "./categories"

export type AddExpensePayload = {
  date: number;
  title: string;
  category: null | number;
  cost: number;
}
export type ExpenseFiltersConfig = {
  month?: Date | null;
}
export type ExpenseFiltersApiPayload = {
  month?: string;
}
export type FormattedExpense = {
  id: number;
  title: string;
  date: Date;
  cost: number;
  category: Category;
}
export type Expense = {
  id: number;
  title: string;
  date: Date;
  cost: number;
  category: Category;
}
