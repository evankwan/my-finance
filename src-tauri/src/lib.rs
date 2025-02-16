#[cfg_attr(mobile, tauri::mobile_entry_point)]

use tauri_plugin_sql::{Migration, MigrationKind};

pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: include_str!("./migrations/1.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "update_expenses_cost_type",
            sql: include_str!("./migrations/update_expenses_cost_type.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "update_expenses_date_type",
            sql: include_str!("./migrations/3.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "update_expenses_category_nullable",
            sql: include_str!("./migrations/4.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "update_expenses_category_fk_nullable",
            sql: include_str!("./migrations/5.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "remove_category_uncategorized",
            sql: include_str!("./migrations/6.sql"),
            kind: MigrationKind::Up,
        },
    ];

    let _ = tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
            .add_migrations(
                "postgres:test.db",
                migrations
            )
            .build()
        )
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
