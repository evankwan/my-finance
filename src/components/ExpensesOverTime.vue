<script setup>
import { ref, computed, watch } from "vue"
import { Line as LineGraph } from "vue-chartjs"
import { subtractMonths, getMonthName } from "@/utilities/dateHelpers.js"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from "chart.js"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

const props = defineProps({
	expenses: {
		type: Array,
		required: true,
	}
})

const possibleTimeSpan = computed(() => ([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))

const currentMonth = new Date().getMonth()
const setMonth = (e) => {
	numberOfMonths.value = Number(e.target.value)
}
const numberOfMonths = ref(3)
const previousMonths = computed(() => {
	const array = [];
	for (let i = 1; i <= numberOfMonths.value; i++) {
		array.push(subtractMonths(currentMonth, (numberOfMonths.value - i)))
	}
	return array
})
const previousMonthsNames = computed(() => previousMonths.value.map((month) => getMonthName(month)))
const chartOptions = computed(() => ({
	response: true,
	scales: {
		y: {
			beginAtZero: true
		}
	}
}))
const previousMonthsExpenses = computed(() => {
	const array = new Array(numberOfMonths.value).fill(0)
	props.expenses.forEach((e) => {
		const month = e.date.getMonth()
		const index = previousMonths.value.findIndex((m) => m === month)
		if (index === -1) {
			return
		}
		array[index] += e.cost
	})
	return array
})
const chartData = computed(() => {
	return {
		labels: previousMonthsNames.value,
		datasets: [
			{
				data: previousMonthsExpenses.value,
				backgroundColor: "#61d58e",
				borderColor: "#e9e9e9",
				label: "",
				pointBorderColor: "#61d58e",
				pointHitRadius: 8,
				pointBorderWidth: 2,
				pointHoverBorderColor: "#ffbf00",
				hoverBackgroundColor: "#ffbf00"
			}
		]
	}
})
</script>

<template>
  <div>
    <h2>Expenses over time</h2>
    <select id="expenses-over-time-months" name="expenses over time months" @change="setMonth">
      <option v-for="number in possibleTimeSpan" :value="number" :selected="number === 3">{{ number }}</option>
    </select>
    <label class="input-label">months</label>
    <LineGraph id="chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<style scoped>
.input-label {
  margin-left: 4px;
}
</style>