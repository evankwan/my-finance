<script setup>
import { ref, toRef, computed, watch, nextTick } from "vue"
import { debounce } from "lodash"

import { useBudgetsStore } from "@/store/budgets"
import { useExpensesStore } from "@/store/expenses"
import { DEFAULT_DEBOUNCE_TIME } from "@/utilities/constants.js"

const budgetsStore = useBudgetsStore()
const expensesStore = useExpensesStore()

const emit = defineEmits(["saveCategory", "unsavedChange"])
const props = defineProps({
	category: {
		required: true,
		type: Object,
	},
})
const budgetCategoryRef = toRef(props, "category")

const budgetCategories = computed(() => budgetsStore.categories)
const expenseCategories = computed(() => expensesStore.categories)

const category = ref(budgetCategoryRef.value.expense_category)
const amount = ref(budgetCategoryRef.value.amount)
const errorMessage = ref(null)
watch(category, async() => {
	const categoryAlreadyExists = budgetCategories.value.some((c) => Number(c.expense_category) === Number(category.value) && c.id !== props.category.id)
	errorMessage.value = categoryAlreadyExists ?
		"Category has already been budgeted" :
		null
	emit("unsavedChange", {
		amount: amount.value,
		budget_id: budgetCategoryRef.value.budget_id,
		expenseCategory: expenseCategories.value.find((c) => c.id === Number(category.value)).id,
		id: budgetCategoryRef.value.id,
	})
})
const saveCategory = debounce(() => {
	if (errorMessage.value) {
		return
	}
	emit("saveCategory", {
		category: {
			amount: amount.value,
			budget_id: budgetCategoryRef.value.budget_id,
			expenseCategory: expenseCategories.value.find((c) => c.id === Number(category.value)).id,
			id: budgetCategoryRef.value.id,
		},
	})
}, DEFAULT_DEBOUNCE_TIME)
</script> 

<template>
	<tr class="category-list-row">
		<td class="name-col">
			<select
				id="edit-category-categories"
				v-model="category"
				name="categories"
				class="category-input"
				required
				@change="saveCategory"
			>
				<option
					v-for="c in expenseCategories"
					:key="`new-category-category-${c.id}`"
					:value="c.id"
				>
					{{ c.name }}
				</option>
			</select>
			<p 
				v-if="errorMessage"
				class="error-message"
			>
				{{ errorMessage }}
			</p>
		</td>
		<td class="amount-col">
			<input
				id="edit-category-amount"
				v-model="amount"
				type="number"
				name="cost"
				min="0"
				step="0.01"
				placeholder="0"
				class="category-input"
				required
				@input="saveCategory"
			>
		</td>
		<td class="action-col" />
		<td />
	</tr>
</template>

<style scoped>
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
	text-align: right;
	position: relative;
}
.amount-col::after {
	content: "$";
	font-size: 1rem;
	left: 0;
	top: 2px;
	position: absolute;
	z-index: 10;
}
.action-col {
	grid-column: 5 / span 1;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: left;
}
.category-input {
	box-sizing: border-box;
	padding: 0 1.25rem;
	background: none;
	color: #f9f9f9;
	margin: 0;
	border-radius: 0;
	width: 100%;
}
.category-input::-webkit-outer-spin-button,
.category-input::-webkit-inner-spin-button {
	display: none;
}
.amount-col .category-input {
	text-align: right;
}
.error-message {
	color: #e23535;
}
</style>