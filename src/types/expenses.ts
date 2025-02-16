export type AddExpensePayload = {
  date: number;
  title: string;
  category: null | number;
  cost: number;
}
export type ExpenseFiltersConfig = {
  month?: number | null;
}
