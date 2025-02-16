ALTER TABLE expenses 
ALTER COLUMN category DROP NOT NULL, 
ADD CONSTRAINT fk_expense_category FOREIGN KEY (category) REFERENCES categories(id) ON DELETE SET NULL;
