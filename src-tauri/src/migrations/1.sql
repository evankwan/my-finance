CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

INSERT INTO categories (name) VALUES ('Uncategorized');

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  date INTEGER NOT NULL,
  category INT,
  title TEXT NOT NULL,
  cost NUMERIC(13, 2) NOT NULL,
  CONSTRAINT FK_ExpenseCategory FOREIGN KEY (category) REFERENCES categories(id)
);

CREATE TABLE expense_tags (
  expense_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  CONSTRAINT FK_ExpenseId FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
  CONSTRAINT FK_TagId FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
