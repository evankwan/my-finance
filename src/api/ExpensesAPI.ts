import Database from "./services/database";

import type {
	Expense,
	AddExpensePayload,
	ExpenseFiltersApiPayload,
} from "../types/expenses";

export async function getAll(): Promise<Expense[]> {
	const db = await Database.connect();
	return await db.select(`
		SELECT 
			expenses.id, 
			expenses.date, 
			expenses.title, 
			expenses.cost, 
			json_object('id', categories.id, 'name', categories.name) AS category
		FROM expenses
		LEFT JOIN categories ON expenses.category = categories.id
		ORDER BY expenses.date DESC
	`);
}
export async function getAllWithFilter(
	filters: ExpenseFiltersApiPayload,
): Promise<Expense[]> {
	const filterQueries: string[] = [];
	if (filters?.month) {
		filterQueries.push(
			`WHERE strftime('%Y-%m', datetime(date / 1000, 'unixepoch')) = strftime('%Y-%m', '${filters.month}')`,
		);
	}
	const filterQueryString = filterQueries.join(" ");
	const db = await Database.connect();
	return db.select(`SELECT 
			expenses.id, 
			expenses.date, 
			expenses.title, 
			expenses.cost, 
			json_object('id', categories.id, 'name', categories.name) AS category
		FROM expenses
		LEFT JOIN categories ON expenses.category = categories.id
		${filterQueryString}
		ORDER BY expenses.date DESC
	`);
}
export async function add(expense: AddExpensePayload) {
	const { date, title, category, cost } = expense;
	let categoryRef = "?";
	if (!category) {
		categoryRef = "NULL";
	}
	const db = await Database.connect();
	await db.execute(
		`INSERT INTO expenses (date, category, title, cost) VALUES (?,${categoryRef},?,?)`,
		[date, category, title, cost],
	);
	return expense;
}
export async function remove(expenseId: number) {
	const db = await Database.connect();
	return db.execute(`DELETE FROM expenses WHERE id = ?`, [expenseId]);
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
