import Database from "tauri-plugin-sql-api"

let db = null;

const connect = async () => {
  try {
    db = await Database.load("sqlite:test.db")
    return db;
  } catch (error) {
    console.error(error)
  }
}

export default { connect }
