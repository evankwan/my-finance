<script setup lang="ts">
import type { ComputedRef, Ref } from "vue"
import type { Expense } from "../types/Expense"
import { defineProps, computed, ref } from "vue"
import { getMonthName, formatTimestampToDate } from "../utilities/dateHelpers"

const props = defineProps<{
  expense?: Expense,
}>()
const expense: ComputedRef = computed(() => props.expense ?? {
  id: 1,
  category: "uncategorized",
  title: "title",
  cost: 0
})

const expenseDate = computed(() => {
  const convertedDate = formatTimestampToDate(expense.value.date)
  const num = convertedDate.getUTCDate();
  const month = convertedDate.getUTCMonth() + 1
  const date = `${num < 10 ? "0" + num : num}`
  const year = convertedDate.getUTCFullYear()
  return `${year}-${month}-${date}`
})
</script>

<template>
  <tr class="table-grid">
    <td class="date-col">
      <input :id="`editing-date-input-${expense.id}`" :value="expenseDate" class="date-input" type="date"
        name="date-picker" required />
    </td>
    <td class="category-col">
      <select :id="`editing-date-input-${expense.id}`" :value="expense.category" name="categories"
        class="category-input" required>
        <option value="uncategorized">Uncategorized</option>
      </select>
    </td>
    <td class="title-col">
      <input id="title-input" :value="expense.title" type="text" name="title" placeholder="'Summit Garden'"
        class="title-input" required />
    </td>
    <td class="cost-col">
      <input id="cost-input" :value="expense.cost" type="number" name="cost" min="0" step="0.01" placeholder="$0"
        class="cost-input" required />
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