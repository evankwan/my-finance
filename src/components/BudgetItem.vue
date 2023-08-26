<script setup>
import { ref, toRef, watch, computed } from "vue"
import { debounce } from "lodash"

import { useExpensesStore } from "@/store/expenses"

const expensesStore = useExpensesStore()

const emit = defineEmits(["saveCategory"])
const props = defineProps({
	category: {
		required: true,
		type: Object,
	},
})
const budgetCategoryRef = toRef(props, "category")

const expenseCategories = computed(() => expensesStore.categories)

const categoryRef = ref(null)
watch(categoryRef, (el) => {
	el.value = expenseCategories.value.find((c) => c.id === Number(budgetCategoryRef.value.expense_category)).id
})
const amountRef = ref(null)
watch(amountRef, (el) => {
	el.value = budgetCategoryRef.value.amount
})

const saveCategory = debounce(() => {
	emit("saveCategory", {
		category: {
			amount: amountRef.value.value,
			budget_id: budgetCategoryRef.value.budget_id,
			expenseCategory: expenseCategories.value.find((c) => c.id === Number(categoryRef.value.value)).id,
			id: budgetCategoryRef.value.id,
		},
	})
}, 300)
</script> 

<template>
	<tr class="category-list-row">
		<td class="name-col">
			<select
				id="new-category-categories"
				ref="categoryRef"
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
		</td>
		<td class="amount-col">
			<input
				ref="amountRef"
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
</style>