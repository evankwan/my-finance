import { defineStore } from "pinia";
import { ref, computed, nextTick, reactive, watch } from "vue";
import { format } from "date-fns";

import { getAll, add, remove, getAllWithFilter } from "../api/ExpensesAPI";
import type {
	Expense,
	FormattedExpense,
	AddExpensePayload,
	ExpenseFiltersConfig,
	ExpenseFiltersApiPayload,
} from "../types/expenses";
import { UNCATEGORIZED } from "../utilities/constants";

export const useExpensesStore = defineStore("expenses", () => {
	// state
	const _expenses = ref<Expense[]>([]);
	const _fitleredExpenses = ref<Expense[]>([]);
	const _expensesFilters = reactive<ExpenseFiltersConfig>({
		month: null,
	});

	// actions
	const getExpenses = async (): Promise<FormattedExpense[]> => {
		const res = await getAll();
		_expenses.value = res;
		await nextTick();
		console.log(_expenses.value);
		return expenses.value;
	};

	const getExpensesWithFilter = async (
		filters: ExpenseFiltersConfig = {},
	): Promise<FormattedExpense[]> => {
		const formattedFilters: ExpenseFiltersApiPayload = {};
		if (filters?.month) {
			formattedFilters.month = format(filters.month, "yyyy-MM-dd");
		}
		const res = await getAllWithFilter(formattedFilters);
		_fitleredExpenses.value = res;
		await nextTick();
		return filteredExpenses.value;
	};

	const addExpense = async (expense: AddExpensePayload) => {
		const newExpense = await add(expense);
		return newExpense;
	};

	const removeExpense = async (expenseId: number) => {
		await remove(expenseId);
		return;
	};

	const setExpensesFilters = (filters: ExpenseFiltersConfig = {}): void => {
		Object.keys(filters).forEach((filter) => {
			_expensesFilters[filter as "month"] = filters[filter as "month"];
		});
	};

	// watchers
	watch(_expensesFilters, async () => {
		await getExpensesWithFilter(_expensesFilters);
	});

	// getters
	const formatExpense = (expense: any) => ({
		...expense,
		date: format(new Date(expense.date), "yyyy, MMM dd"),
		cost: Number(expense.cost.toFixed(2)),
		category: expense.category.id ? expense.category : UNCATEGORIZED,
	});
	const expenses = computed<FormattedExpense[]>(() =>
		_expenses.value.map(formatExpense),
	);
	const expensesMonthFilter = computed<Date | null | undefined>(
		() => _expensesFilters.month,
	);
	const filteredExpenses = computed<FormattedExpense[]>(() =>
		_fitleredExpenses.value.map(formatExpense),
	);

	return {
		// state/getters
		expenses,
		expensesMonthFilter,
		filteredExpenses,

		// actions
		getExpenses,
		addExpense,
		removeExpense,
		setExpensesFilters,
		getExpensesWithFilter,
	};
});
