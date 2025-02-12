import Database from "./services/Database"

export async function getAll() {
	const db = await Database.connect()
	return await db.select("SELECT * FROM expenses ORDER BY date DESC")
}
export async function getCategories() {
	const db = await Database.connect()
	return await db.select("SELECT * FROM categories")
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
export async function remove(expenseId) {
	const db = await Database.connect()
	return db.execute(`DELETE FROM expenses WHERE id = $1`, [
		expenseId
	])
}
// export async function addCategory(category) {
// 	const db = await Database.connect()
// 	await db.execute("INSERT INTO categories (name) VALUES ($1)", [
// 		category
// 	])
// 	return category
// }
// export async function updateExpense(expense) {
// 	const { category, cost, date, id, title } = expense

// 	const db = await Database.connect()
// 	await db.execute(
// 		"UPDATE expenses SET category = ?, cost = ?, date = ?, title = ? WHERE id = ?",
// 		[
// 			category,
// 			cost,
// 			date,
// 			title,
// 			id,
// 		]
// 	)
// 	return expense
// }
