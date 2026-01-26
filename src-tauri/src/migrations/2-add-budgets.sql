CREATE TABLE budgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

INSERT INTO budgets (id, name) VALUES (1, 'Monthly');

CREATE TABLE budget_categories (
  budget_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  amount INTEGER,
  CONSTRAINT FK_BudgetId FOREIGN KEY (budgets) REFERENCES budgets(id) ON DELETE SET NULL,
  CONSTRAINT FK_CategoryId FOREIGN KEY (categories) REFERENCES categories(id) ON DELETE SET NULL,
);
