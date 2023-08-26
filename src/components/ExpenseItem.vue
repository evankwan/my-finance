<script setup>
import { computed, toRef, watch, ref } from "vue"
import { debounce } from "lodash"
import { useExpensesStore } from "@/store/expenses"

const emit = defineEmits(["saveExpense"])

const props = defineProps({
	expense: {
		required: true,
		type: Object
	},
})
const expenseRef = toRef(props, "expense")

const expensesStore = useExpensesStore()

const dateRef = ref(null)
watch(dateRef, (el) => {
	const val = expenseRef.value.date
	const num = val.getUTCDate()
	const monthNumber = val.getUTCMonth() + 1
	const month = (monthNumber) < 10 ? `0${monthNumber}` : monthNumber
	const date = `${num < 10 ? "0" + num : num}`
	el.value = `${val.getUTCFullYear()}-${month}-${date}`
})

const categories = computed(() => expensesStore.categories)
const categoryRef = ref(null)
watch(categoryRef, (el) => {
	el.value = categories.value.find((c) => c.id === expenseRef.value.category).id
})

const titleRef = ref(null)
watch(titleRef, (el) => {
	el.value = expenseRef.value.title
})

const costRef = ref(null)
watch(costRef, (el) => {
	el.value = expenseRef.value.cost
})

const saveExpense = debounce(() => {
	emit("saveExpense", {
		expense: expenseRef.value
	})
}, 300)
</script>

<template>
	<tr class="table-grid">
		<td class="date-col">
			<input :id="`editing-date-input-${expenseRef.id}`" ref="dateRef" class="date-input" type="date"
				name="date-picker" required @change="saveExpense">
		</td>
		<td class="category-col">
			<select :id="`editing-date-input-${expenseRef.id}`" ref="categoryRef" name="categories" class="category-input"
				required @change="saveExpense">
				<option v-for="c in categories" :value="c.id">
					{{ c.name }}
				</option>
			</select>
		</td>
		<td class="title-col">
			<input id="title-input" ref="titleRef" type="text" name="title" placeholder="'Summit Garden'"
				class="title-input" required @input="saveExpense">
		</td>
		<td class="cost-col">
			<input id="cost-input" ref="costRef" type="number" name="cost" min="0" step="0.01" placeholder="0"
				class="cost-input" required @input="saveExpense">
		</td>
	</tr>
</template>

<style scoped>
.table-grid {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	column-gap: 0.5rem;
	row-gap: 0.5rem;
	width: 100%;
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
	position: relative;
}

.action-col {
	grid-column: 12 / span 1;
}

.date-input,
.category-input,
.title-input,
.cost-input {
	padding: 0;
	background: none;
	color: #f9f9f9;
	margin: 0;
}

.cost-input {
	text-align: right;
	padding-left: 1rem;
	width: calc(100% - 1rem);
}

.cost-col::after {
	content: "$";
	font-size: 1rem;
	left: 0;
	top: 2px;
	position: absolute;
	z-index: 10;
}

.cost-input::-webkit-outer-spin-button,
.cost-input::-webkit-inner-spin-button {
	display: none;
}
</style>