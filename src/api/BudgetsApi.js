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
	const { expenseCategory, amount, budget_id } = category;

	const db = await Database.connect()
	await db.execute("INSERT INTO budget_categories (expense_category, amount, budget_id) VALUES ($1, $2, $3)", [
		expenseCategory,
		amount,
		budget_id
	])
	return category
}
export async function updateCategory(category) {
	const { expenseCategory, amount, budget_id, id } = category;
	console.log({ expenseCategory, amount, budget_id, id })
	const db = await Database.connect()
	await db.execute("UPDATE budget_categories SET expense_category = ?, amount = ?, budget_id = ? WHERE id = ?", [
		expenseCategory,
		amount,
		budget_id,
		id
	])
	return category
}
