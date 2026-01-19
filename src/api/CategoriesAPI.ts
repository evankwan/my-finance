import Database from "./services/database";

export async function getCategories(): Promise<any[]> {
	const db = await Database.connect();
	return await db.select("SELECT * FROM categories");
}
export async function addCategory(category: string) {
	const db = await Database.connect();
	await db.execute("INSERT INTO categories (name) VALUES (?)", [category]);
	return category;
}
export async function removeCategory(id: number) {
	if (typeof id !== "number") {
		console.error("wrong type");
		return;
	}

	const db = await Database.connect();
	await db.execute("DELETE FROM categories WHERE id = ?", [id]);
	return await db.execute(
		`UPDATE expenses SET category = NULL WHERE category = ?`,
		[id],
	);
}
