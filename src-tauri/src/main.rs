use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(TauriSql::default().add_migrations(
            "sqlite:test.db",
            vec![
                Migration {
                    version: 1,
                    description: "create expenses",
                    sql: include_str!("../migrations/1.sql"),
                    kind: MigrationKind::Up,
                },
                Migration {
                    version: 2,
                    description: "create uncategorized category",
                    sql: include_str!("../migrations/2.sql"),
                    kind: MigrationKind::Up,
                },
                Migration {
                    version: 3,
                    description: "create budgets",
                    sql: include_str!("../migrations/3.sql"),
                    kind: MigrationKind::Up,
                },
                Migration {
                    version: 4,
                    description: "update budgets schema",
                    sql: include_str!("../migrations/4.sql"),
                    kind: MigrationKind::Up,
                },
                Migration {
                    version: 5,
                    description: "update budgets schema",
                    sql: include_str!("../migrations/5.sql"),
                    kind: MigrationKind::Up,
                },
            ],
        ))
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
