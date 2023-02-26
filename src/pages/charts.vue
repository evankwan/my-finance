<script setup>
import { onMounted, computed } from "vue"
import { Line as LineGraph } from "vue-chartjs"

import { useExpensesStore } from "../store/expenses"
import PageHeader from "../components/PageHeader.vue"
import { subtractMonths, getMonthName } from "../utilities/dateHelpers.js"

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

const expensesStore = useExpensesStore()

const currentMonth = new Date().getMonth()
const numberOfMonths = computed(() => 3);
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
  expensesStore.list.forEach((e) => {
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
        label: 'total expenses in $',
        backgroundColor: '#61d58e',
        data: previousMonthsExpenses.value
      }
    ]
  }
})

onMounted(async () => {
  await expensesStore.getCategories()
})
</script>

<template>
  <div class="chart-wrapper">
    <PageHeader id="expenses-header" heading="Charts" />
    <main>
      <LineGraph id="chart" :options="chartOptions" :data="chartData" />
    </main>
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>