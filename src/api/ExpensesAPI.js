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
  add: async (payload) => {
    // const { id, date, title, cateogry, cost } = payload;
    // const db = await Database.connect()
    // return await db.select(`INSERT INTO expenses (date, category, title, cost) VALUES (${date}, ${title}, ${category}, ${cost})`)
    return null;
  }
}