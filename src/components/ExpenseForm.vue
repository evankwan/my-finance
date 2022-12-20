<script setup>
import { ref, computed } from "vue"

import { useExpensesStore } from "../store/expenses";

import { formatDateToTimestamp } from "../utilities/dateHelpers"

const expensesStore = useExpensesStore()

const categories = computed(() => expensesStore.categories)

const date = ref(new Date())
const category = ref(1)
const title = ref("")
const cost = ref(0)

const handleAddExpense = async (e) => {
  e.preventDefault()
  isShowingError.value = errorMessages.value.length ? true : false

  const offset = new Date(Date.now()).getTimezoneOffset() / 60
  const expenseDate = new Date(date.value)
  expenseDate.setHours(expenseDate.getHours() + offset)

  const chosenCategory = categories.value.find((c) => c.id === category.value)
  console.log(chosenCategory)
  const expense = {
    id: expensesStore.list.length + 1,
    date: formatDateToTimestamp(expenseDate),
    cost: cost.value.toFixed(2),
    title: title.value,
    category: chosenCategory.id
  }
  await expensesStore.add({ expense })
  clearForm()
}
const clearForm = () => {
  title.value = ""
  cost.value = 0
  category.value = 0
}

const isShowingError = ref(false)
const errorMessages = computed(() => {
  const messages = []

  if (!title.value.length) {
    messages.push("Your expense name field must have at least 1 character")
  }
  if (typeof cost.value !== "number") {
    messages.push("You must enter a number in the cost field")
  }
  if (typeof category.value !== "number") {
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
      <input id="date-input" v-model="date" class="date-input" type="date" name="date-picker" required />
      <select id="categories" v-model="category" name="categories" class="category-input" required>
        <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
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
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 0.2rem;
  width: 100%;
}

.date-input {
  grid-column: 1 / span 2;
}

.category-input {
  grid-column: 3 / span 3;
}

.title-input {
  flex-grow: 1;
  grid-column: 6 / span 4;
}

.cost-input {
  text-align: right;
  width: 8rem;
  grid-column: 10 / span 2;
}

.cost-input::-webkit-outer-spin-button,
.cost-input::-webkit-inner-spin-button {
  display: none;
}

.submit-button {
  justify-self: flex-end;
  grid-column: 12 / span 1;
}

.error-messages-container {
  color: #e23535;
  font-weight: bold;
  padding-left: 0.5rem;
  width: 100%;
  min-height: 2rem;
}
</style>