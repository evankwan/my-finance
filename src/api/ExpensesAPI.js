import Database from "@/services/Database"

export async function getAll() {
  const db = await Database.connect()
  return db.select("SELECT * FROM expenses")
}
export async function getCategories() {
  const db = await Database.connect()
  return db.select("SELECT * FROM categories")
}
export async function add(expense) {
  const { date, title, category, cost } = expense
  const db = await Database.connect()
  await db.execute("INSERT INTO expenses (date, category, title, cost) VALUES ($1,$2,$3,$4)", [
    date,
    category,
    title,
    cost
  ])
  return expense
}
export async function addCategory(category) {
  const db = await Database.connect()
  await db.execute("INSERT INTO categories (name) VALUES ($1)", [
    category
  ])
  return category
}
