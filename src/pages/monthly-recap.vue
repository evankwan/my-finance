<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Panel from "primevue/panel";
import DatePicker from "primevue/datepicker";
import Chart from "primevue/chart";

import { useExpensesStore } from "../store/expenses";

const expensesStore = useExpensesStore();

const totalExpensesForMonth = computed(() => {
	const totalCost = expensesStore.filteredExpenses
		.reduce((acc, cur) => acc + cur.cost, 0)
		.toFixed(2);
	return `$${totalCost}`;
});

const selectedMonth = ref(new Date());
watch(
	selectedMonth,
	(month: Date) => {
		expensesStore.setExpensesFilters({ month });
	},
	{ immediate: true },
);

const categories = computed(() => {
	const array = expensesStore.filteredExpenses.map(
		({ category }) => category.name,
	);
	return [...new Set(array)];
});
const expensesByCategory = computed<number[]>(() => {
	const categoryCostMap = expensesStore.filteredExpenses.reduce(
		(acc: any, { cost, category }) => {
			acc.get(category.name)
				? acc.set(
						category.name,
						Number(Number(acc.get(category.name)) + cost).toFixed(2),
					)
				: acc.set(category.name, Number(cost));
			return acc;
		},
		new Map(),
	);
	console.log(categoryCostMap);
	return categories.value.map((category) => Number(categoryCostMap[category]));
});
const pieChartData = ref({
	labels: categories.value,
	datasets: [
		{
			label: "Dataset",
			data: expensesByCategory.value,
		},
	],
});
const pieChartOptions = ref();
</script>

<template>
	<div>
		<header
			aria-label="monthly expenses panels"
			class="monthly-expenses-header"
		>
			<div class="month-expenses-header__left-panel">
				<DatePicker
					v-model="selectedMonth"
					name="month"
					view="month"
					date-format="MM, yy"
					placeholder="Select a month"
					class="month-expenses-header__left-panel-select"
				/>
			</div>
			<Panel header="Total expenses" class="total-expenses-panel">
				<p class="total-expenses-text">{{ totalExpensesForMonth }}</p>
			</Panel>
		</header>
		<section aria-label="monthly expenses by category">
			<Chart
				v-if="expensesByCategory.length"
				type="pie"
				:data="pieChartData"
				:options="pieChartOptions"
				class=""
			/>
		</section>
	</div>
</template>
<style scoped>
.monthly-expenses-header {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
}
.month-expenses-header__left-panel {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	justify-content: flex-start;
	align-items: flex-start;
	flex-grow: 1;
	font-size: 1.5rem !important;
}
.month-expenses-header__left-panel-heading {
	margin: 0;
}
.month-expenses-header__left-panel-select {
	width: 15rem;
}
.total-expenses-panel {
	width: 15rem;
}
.total-expenses-text {
	margin: 0.5rem 0;
	font-size: 2rem;
	font-weight: bold;
}
</style>
