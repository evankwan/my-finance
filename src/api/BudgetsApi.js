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
export async function addCategory(category) {
  const { name, amount, budget_id } = category;
  const db = await Database.connect()
  await db.execute("INSERT INTO budget_categories (name, amount, budget_id) VALUES ($1, $2, $3)", [
    name,
    amount,
    budget_id
  ])
  return category
}
