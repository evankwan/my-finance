<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"

import { useExpensesStore } from "../store/store";
import type { Expense } from "../types/Expense"

const expensesStore = useExpensesStore()

const title: Ref = ref("");
const cost: Ref = ref(0);
const date: Ref = ref(new Date());
const category: Ref = ref("uncategorized");

const handleAddExpense = async (e: Event) => {
  e.preventDefault()
  const expense: Expense = {
    id: expensesStore.list.length + 1,
    date: date.value,
    cost: cost.value,
    title: title.value,
    category: category.value
  }
  console.log(expense)
  await expensesStore.add({ expense })
  clearForm()
}
const clearForm = () => {
  title.value = ""
  cost.value = 0
  category.value = "uncategorized"
}
</script>

<template>
  <form id="expense-form" class="expense-form" @submit.pervent="handleAddExpense">
    <input id="date-input" v-model="date" type="date" name="date-picker" />
    <input id="title-input" v-model="title" type="text" name="title" placeholder="'Summit Garden'"
      class="title-input" />
    <input id="cost-input" v-model="cost" type="number" name="cost" min="0" step="0.01" placeholder="$0"
      class="cost-input" />
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