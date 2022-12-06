<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import type { Ref, ComputedRef } from "vue"

import { useExpensesStore } from "../store/expenses";
import type { Expense } from "../types/Expense"

const expensesStore = useExpensesStore()

const title: Ref = ref("");
const cost: Ref = ref(0);
const date: Ref = ref(new Date());
const category: Ref = ref("uncategorized");

const handleAddExpense = async (e: Event) => {
  e.preventDefault()
  isShowingError.value = errorMessages.value.length ? true : false

  const expense: Expense = {
    id: expensesStore.list.length + 1,
    date: new Date(date.value),
    cost: cost.value,
    title: title.value,
    category: category.value
  }
  await expensesStore.add({ expense })
  clearForm()
}
const clearForm = () => {
  title.value = ""
  cost.value = 0
  category.value = "uncategorized"
}

const isShowingError: Ref = ref(false)
const errorMessages: ComputedRef = computed(() => {
  const messages: string[] = []

  if (!title.value.length) {
    messages.push("Your expense name field must have at least 1 character")
  }
  if (typeof cost.value !== "number") {
    messages.push("You must enter a number in the cost field")
  }
  if (typeof category.value !== "string") {
    messages.push("You must enter a valid category")
  }
  if (!messages.length) {
    isShowingError.value = false;
  }
  return messages
})
</script>

<template>
  <form id="expense-form" @submit="handleAddExpense">
    <div class="expense-form">
      <input id="date-input" v-model="date" type="date" name="date-picker" required />
      <select id="categories" v-model="category" name="categories" required>
        <option value="uncategorized">Uncategorized</option>
      </select>
      <input id="title-input" v-model="title" type="text" name="title" placeholder="'Summit Garden'" class="title-input"
        required />
      <input id="cost-input" v-model="cost" type="number" name="cost" min="0" step="0.01" placeholder="$0"
        class="cost-input" required />
      <button class="submit-button">Enter</button>
    </div>
    <div id="error-messages-container" class="error-messages-container">
      <p v-if="isShowingError" v-for="message in errorMessages" class="error-message">{{ message }}</p>
    </div>
  </form>
</template>

<style scoped>
.expense-form {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title-input {
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

.error-messages-container {
  color: #e23535;
  font-weight: bold;
  padding-left: 0.5rem;
  width: 100%;
  min-height: 2rem;
}
</style>