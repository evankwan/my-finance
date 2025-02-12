import Database from "@tauri-apps/plugin-sql"


const connect = async () => {
	try {
		const db = await Database.load("postgres:test.db").catch(console.error)
		return db;
	} catch (error) {
		console.error(error)
	}
}

export default { connect }
