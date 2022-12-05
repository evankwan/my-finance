<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"

import { useExpensesStore } from "../store/store";
import type { Expense } from "../types/Expense"

const expensesStore = useExpensesStore()

const title: Ref = ref("");
const cost: Ref = ref(0);
const date: Ref = ref(new Date());
const category: Ref = ref("");

const handleAddExpense = () => {
  const expense: Expense = {
    id: 1,
    date: date.value,
    cost: cost.value,
    title: title.value,
    category: category.value
  }
  expensesStore.add({ expense })
}
</script>

<template>
  <form class="expense-form" @submit.pervent="handleAddExpense">
    <input v-model="date" type="date" name="date-picker" />
    <input v-model="title" type="text" name="what" placeholder="'Summit Garden'" class="what-input" />
    <input v-model="cost" type="number" name="cost" min="0" step="0.01" placeholder="$0" class="cost-input" />
    <button class="submit-button">Enter</button>
  </form>
</template>

<style scoped>
.expense-form {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.what-input {
  flex-grow: 1;
}

.cost-input {
  text-align: right;
  width: 8rem;
}

.cost-input::-webkit-outer-spin-button,
.cost-input::-webkit-inner-spin-button {
  display: none;
}

.submit-button {
  justify-self: flex-end;
}
</style>