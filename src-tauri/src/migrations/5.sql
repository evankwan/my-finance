ALTER TABLE expenses DROP CONSTRAINT fk_expense_category;
ALTER TABLE expenses DROP CONSTRAINT FK_ExpenseCategory;

ALTER TABLE expenses 
ADD CONSTRAINT FK_ExpenseCategory FOREIGN KEY (category) 
REFERENCES categories(id) 
ON DELETE SET NULL;
