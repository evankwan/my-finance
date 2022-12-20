#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(TauriSql::default().add_migrations(
            "sqlite.db",
            vec![Migration {
                version: 1,
                description: "create expenses and categories",
                sql: include_str!("../migrations/1.sql"),
                kind: MigrationKind::Up,
            }],
        ))
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
