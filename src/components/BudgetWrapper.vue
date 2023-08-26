<script setup>
import { ref, computed, onMounted } from "vue"

import BudgetItem from "@/components/BudgetItem.vue"

import { useBudgetsStore } from "@/store/budgets"
import { useExpensesStore } from "@/store/expenses"
import { DEFAULT_BUDGET_ID } from "@/utilities/constants.js"

const budgetsStore = useBudgetsStore()
const expensesStore = useExpensesStore()

const expenseCategories = computed(() => expensesStore.categories)

const categories = computed(() => budgetsStore.categories)
const currentBudget = ref({})
onMounted(async () => {
	await Promise.all([
		budgetsStore.getBudgets(),
		budgetsStore.getCategories(DEFAULT_BUDGET_ID)
	])
	currentBudget.value = budgetsStore.budgets.find(({ id }) => id === DEFAULT_BUDGET_ID)
})

const expenseCategory = ref(1)
const newCategoryAmount = ref(0)
const handleAddNewCategory = async () => {
	await budgetsStore.saveCategory(currentBudget.value.id, {
		expenseCategory: expenseCategory.value,
		amount: newCategoryAmount.value,
	})
	resetNewCategoryForm()
}
const resetNewCategoryForm = () => {
	expenseCategory.value = 1
	newCategoryAmount.value = 0
}

const totalBudget = computed(() => {
	return categories.value.reduce((acc, cur) => acc + cur.amount, 0)
})

const handleUpdateCategory = async ({ category }) => {
	await budgetsStore.updateCategory(category)
	await budgetsStore.getCategories(DEFAULT_BUDGET_ID)
} 
</script>

<template>
	<div class="budget-inner-wrapper">
		<div class="budget-form-wrapper">
			<h2 class="budget-name">
				Budget: {{ currentBudget.name }}
			</h2>
			<table class="category-list">
				<tr class="category-list-row">
					<th
						id="name-heading"
						class="name-col"
					>
						Category name
					</th>
					<th
						id="amount-heading"
						class="amount-col"
					>
						Amount
					</th>
					<th
						id="action-heading"
						class="action-col action-col-header"
					>
						Action
					</th>
				</tr>
				<tr class="category-list-row">
					<td class="name-col">
						<select
							id="new-category-categories"
							v-model="expenseCategory"
							name="categories"
							class="category-name-input"
							required
						>
							<option
								v-for="c in expenseCategories"
								:key="`new-category-category-${c.id}`"
								:value="c.id"
							>
								{{ c.name }}
							</option>
						</select>
					</td>
					<td class="amount-col">
						<input
							v-model="newCategoryAmount"
							class="category-amount-input"
							type="number"
							name="cost"
							min="0"
							step="0.01"
							placeholder="$0"
							required
						>
					</td>
					<td class="action-col">
						<button
							class="add-category-button"
							@click="handleAddNewCategory"
						>
							Add +
						</button>
					</td>
				</tr>
				<BudgetItem
					v-for="category in categories"
					:key="`category=${category.id}`"
					:category="category"
					@save-category="handleUpdateCategory"
				/>
				<hr>
				<tr class="category-list-row">
					<td class="name-col">
						Total
					</td>
					<td class="amount-col">
						$ {{ totalBudget }}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<style scoped>
.budget-inner-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: start;
	gap: 1rem;
}

.budget-form-wrapper {
	flex-basis: 100%;
}

.budget-name {
	margin-bottom: 2rem;
}

.category-list {
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: stretch;
	width: 100%;
	gap: 1rem;
}

.category-list-row {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 0.5rem;
	width: 100%;
}

.name-col {
	grid-column: 1 / span 2;
	text-align: left;
}

.amount-col {
	grid-column: 3 / span 2;
	text-align: left;
}

.action-col {
	grid-column: 5 / span 1;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: left;
}

.action-col-header {
	justify-content: flex-start;
}

.action-col>button {
	margin: 0 auto;
}

hr {
	border: 1px solid #f9f9f9;
	width: 100%;
}

.category-name-input,
.category-amount-input,
.add-category-button {
	box-sizing: border-box;
	width: 100%;
}
.category-amount-input {
	text-align: right;
}
.category-amount-input::-webkit-outer-spin-button,
.category-amount-input::-webkit-inner-spin-button {
	display: none;
}
</style>