import Database from "../services/database"


export default {
  getAll: async () => {
    const db = await Database.connect()
    return await db.select("SELECT * FROM expenses")
  },
  getCategories: async () => {
    const db = await Database.connect()
    return await db.select("SELECT * FROM categories")
  },
  add: async ({ expense }) => {
    const { date, title, category, cost } = expense
    console.log({ date, title, category, cost })
    const db = await Database.connect()
    await db.execute("INSERT INTO expenses (date, category, title, cost) VALUES ($1,$2,$3,$4)", [
      date,
      category,
      title,
      cost
    ])
    return expense
  }
}