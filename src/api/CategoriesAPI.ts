import Database from "./services/database"

export async function getCategories(): Promise<any[]> {
	const db = await Database.connect()
	return await db.select("SELECT * FROM categories")
}
export async function addCategory(category: string) {
	const db = await Database.connect()
	await db.execute("INSERT INTO categories (name) VALUES ($1)", [
		category
	])
	return category
}
