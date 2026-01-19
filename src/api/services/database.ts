import Database from "@tauri-apps/plugin-sql";

const connect = async (): Promise<Database> => {
	return await Database.load("sqlite:test.db");
};

export default { connect };
