DROP TABLE budget_categories;

CREATE TABLE IF NOT EXISTS budget_categories (
	id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
	category VARCHAR(255) NOT NULL,
	budget_id INTEGER NOT NULL,
	amount DOUBLE(13, 2) NOT NULL,
	CONSTRAINT FK_CategoryBudget FOREIGN KEY (budget_id) REFERENCES budgets(id)
	CONSTRAINT FK_CategoryExpenseCategory FOREIGN KEY (category) REFERENCES categories(id)
);
