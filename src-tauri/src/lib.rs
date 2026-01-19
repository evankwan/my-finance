#[cfg_attr(mobile, tauri::mobile_entry_point)]

use tauri_plugin_sql::{Migration, MigrationKind};

pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: include_str!("./migrations/1-init.sql"),
            kind: MigrationKind::Up,
        },
    ];
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:test.db", migrations)
            .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
