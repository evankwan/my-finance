<script setup>
import { onMounted, computed } from "vue"

import { useExpensesStore } from "../store/expenses"
import PageHeader from "../components/PageHeader.vue"
import ExpensesOverTime from "../components/ExpensesOverTime.vue"

const expensesStore = useExpensesStore()
const expenses = computed(() => expensesStore.list)

onMounted(async () => {
  await expensesStore.getCategories()
})
</script>

<template>
  <div class="chart-wrapper">
    <PageHeader id="expenses-header" heading="Charts" />
    <main>
      <ExpensesOverTime :expenses="expenses" />
    </main>
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>