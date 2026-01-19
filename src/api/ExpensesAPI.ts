import Database from "./services/database";

import type { Category } from "../types/categories";
import type {
	Expense,
	AddExpensePayload,
	ExpenseFiltersApiPayload,
} from "../types/expenses";

type ExpenseWithCategoryTypes = Expense & {
	category_id: Category["id"];
	category_name: Category["name"];
};

export async function getAll(): Promise<Expense[]> {
	const db = await Database.connect();
	const results: ExpenseWithCategoryTypes[] = await db.select(`
		SELECT 
			expenses.id, 
			expenses.date, 
			expenses.title, 
			expenses.cost, 
			categories.id as category_id,
			categories.name as category_name
		FROM expenses
		LEFT JOIN categories ON expenses.category = categories.id
		ORDER BY expenses.date DESC
	`);
	return results.map(
		(expense: ExpenseWithCategoryTypes) =>
			({
				id: expense.id,
				date: expense.date,
				title: expense.title,
				cost: expense.cost,
				category: expense.category_id
					? { id: expense.category_id, name: expense.category_name }
					: null,
			}) as Expense,
	);
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
	const results: ExpenseWithCategoryTypes[] = await db.select(`SELECT 
			expenses.id, 
			expenses.date, 
			expenses.title, 
			expenses.cost, 
			categories.id as category_id,
			categories.name as category_name
		FROM expenses
		LEFT JOIN categories ON expenses.category = categories.id
		${filterQueryString}
		ORDER BY expenses.date DESC
	`);
	return results.map(
		(expense: ExpenseWithCategoryTypes) =>
			({
				id: expense.id,
				date: expense.date,
				title: expense.title,
				cost: expense.cost,
				category: expense.category_id
					? { id: expense.category_id, name: expense.category_name }
					: null,
			}) as Expense,
	);
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
