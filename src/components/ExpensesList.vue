<script setup>
import { computed } from "vue"
import { useExpensesStore } from "@/store/expenses"

import ExpenseItem from "./ExpenseItem.vue"

const expensesStore = useExpensesStore()

const list = computed(() => expensesStore.list)

const handleUpdatedExpense = async ({ expense }) => {
	await expensesStore.saveExpense({ expense })
}
</script>

<template>
	<table
		id="expenses-list"
		class="expenses-list"
	>
		<tr class="table-grid header-row">
			<th
				id="date-col"
				class="date-col"
			>
				Date
			</th>
			<th
				id="category-col"
				class="category-col"
			>
				Category
			</th>
			<th
				id="title-col"
				class="title-col"
			>
				Name
			</th>
			<th
				id="cost-col"
				class="cost-col"
			>
				Cost
			</th>
		</tr>
		<ExpenseItem
			v-for="expense in list"
			:key="`expense-${expense.id}`"
			class="expense-item"
			:expense="expense"
			@save-expense="handleUpdatedExpense"
		/>
	</table>
</template>

<style scoped>
.expenses-list {
	width: 100%;
	padding: 0.5rem;
}

.table-grid {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	column-gap: 0.5rem;
	row-gap: 0.5rem;
	width: 100%;
}

.header-row {
	margin-bottom: 1rem;
}

.date-col {
	grid-column: 1 / span 2;
}

.category-col {
	grid-column: 3 / span 3;
}

.title-col {
	grid-column: 6 / span 4;
}

.date-col,
.category-col,
.title-col {
	text-align: left;
}

.cost-col {
	grid-column: 10 / span 2;
	text-align: right;
}

.action-col {
	grid-column: 12 / span 1;
}
</style>