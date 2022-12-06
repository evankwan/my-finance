<script setup lang="ts">
import ExpensesHeader from "../components/ExpensesHeader.vue"
import ExpenseForm from "../components/ExpenseForm.vue"
</script>

<template>
  <div class="expenses-wrapper">
    <ExpensesHeader id="expenses-header" />
    <main>
      <ExpenseForm id="expenses-form" />
    </main>
  </div>
</template>

<style scoped>
.expenses-wrapper {
  width: 100%;
}
</style>