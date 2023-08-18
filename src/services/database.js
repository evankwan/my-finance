import Database from "tauri-plugin-sql-api"

const connect = async () => {
	try {
		const db = await Database.load("sqlite:test.db")
		return db;
	} catch (error) {
		console.error(error)
	}
}

export default { connect }
