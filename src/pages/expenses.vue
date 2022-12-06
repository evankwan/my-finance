<script setup lang="ts">
import ExpensesHeader from "../components/ExpensesHeader.vue"
import ExpenseForm from "../components/ExpenseForm.vue"
import ExpensesList from "../components/ExpensesList.vue"
</script>

<template>
  <div class="expenses-wrapper">
    <ExpensesHeader id="expenses-header" />
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