<script setup lang="ts">
import ExpensesHeader from "../components/ExpensesHeader.vue"
import ExpenseForm from "../components/ExpenseForm.vue"
</script>

<template>
  <div class="expenses-wrapper">
    <ExpensesHeader />
    <main>
      <ExpenseForm />
    </main>
  </div>
</template>

<style scoped>
.expenses-wrapper {
  width: 100%;
}
</style>