import Database from "./services/database"

import type { AddExpensePayload } from "../types/expenses"

export async function getAll() {
	const db = await Database.connect()
	// return await db.select("SELECT * FROM expenses ORDER BY date DESC")
	return await db.select(`
		SELECT 
			expenses.id, 
			expenses.date, 
			expenses.title, 
			expenses.cost, 
			jsonb_build_object('id', categories.id, 'name', categories.name) AS category
		FROM expenses
		LEFT JOIN categories ON expenses.category = categories.id
		ORDER BY expenses.date DESC
	`)
}
export async function add(expense: AddExpensePayload) {
	const { date, title, category, cost } = expense
	let categoryRef = "$2";
	if (!category) {
		categoryRef = "NULL";
	}
	const db = await Database.connect()
	await db.execute(`INSERT INTO expenses (date, category, title, cost) VALUES ($1,${categoryRef},$3,$4)`, [
		date,
		category,
		title,
		cost
	])
	return expense
}
export async function remove(expenseId: number) {
	const db = await Database.connect()
	return db.execute(`DELETE FROM expenses WHERE id = $1`, [
		expenseId
	])
}

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
