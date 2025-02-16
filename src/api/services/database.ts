import Database from "@tauri-apps/plugin-sql"

const connect = async (): Promise<Database> => {
	return await Database.load("postgres:test.db");
}

export default { connect }
