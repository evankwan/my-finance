import Database from "@/services/Database"

export async function getList() {
  const db = await Database.connect()
  return db.select("SELECT * FROM budgets")
}
export async function getBudgetCategories(id) {
  const db = await Database.connect()
  return db.select("SELECT * FROM budget_categories WHERE budget_id = $1", [
    id
  ])
}
