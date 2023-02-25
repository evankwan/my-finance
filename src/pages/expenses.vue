<script setup>
import { onMounted } from "vue"
import PageHeader from "../components/PageHeader.vue"
import ExpenseForm from "../components/ExpenseForm.vue"
import ExpensesList from "../components/ExpensesList.vue"

import { useExpensesStore } from "../store/expenses"

onMounted(async () => {
  const expensesStore = useExpensesStore()
  await expensesStore.getCategories()
})
</script>

<template>
  <div class="expenses-wrapper">
    <PageHeader id="expenses-header" heading="Expenses" />
    <main>
      <ExpenseForm id="expenses-form" />
      <ExpensesList id="expenses-list" />
    </main>
  </div>
</template>

<style scoped>
.expenses-wrapper {
  width: 100%;
}
</style>