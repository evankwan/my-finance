<script setup lang="ts">
import { computed } from "vue"
import type { ComputedRef } from "vue"
import { useExpensesStore } from "../store/expenses"
import { getMonthName } from "../utilities/dateHelpers"

import type { Expense } from "../types/Expense"

const expensesStore = useExpensesStore()
const list: ComputedRef = computed(() => expensesStore.list)

const formatExpenseDate = (expense: Expense) => {
  const month = getMonthName(expense.date?.getMonth())
  const date = expense.date.getDate()
  const year = expense.date.getFullYear()

  return `${month} ${date}, ${year}`
}
</script>

<template>
  <table id="expenses-list" class="expenses-list">
    <tr class="table-grid header-row">
      <th id="date-col" class="date-col">Date</th>
      <th id="category-col" class="category-col">Category</th>
      <th id="title-col" class="title-col">Name</th>
      <th id="cost-col" class="cost-col">Cost</th>
    </tr>
    <tr v-for="expense in list" class="table-grid">
      <td class="date-col">
        {{ formatExpenseDate(expense) }}
      </td>
      <td class="category-col">{{ `${expense.category}` }}</td>
      <td class="title-col">{{ expense.title }}</td>
      <td class="cost-col">${{ expense.cost }}</td>
      <td class="action-col"><button class="edit-button">edit</button></td>
    </tr>
  </table>
</template>

<style scoped>
.expenses-list {
  width: 100%;
  padding: 0.5rem;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  width: 100%;
}

.header-row {
  margin-bottom: 1rem;
}

.date-col {
  grid-column: 1 / span 2;
}

.category-col {
  grid-column: 3 / span 2;
}

.title-col {
  grid-column: 5 / span 5;
}

.date-col,
.category-col,
.title-col {
  text-align: left;
}

.cost-col {
  grid-column: 10 / span 2;
  text-align: right;
}

.action-col {
  grid-column: 12 / span 1;
}

.edit-button {
  padding: 0.2rem 0.6rem;
  margin: 0;
  width: 100%
}
</style>