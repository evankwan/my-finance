<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import DatePicker from "primevue/datepicker"
import InputText from "primevue/inputtext"
import Select from "primevue/select"
import Button from "primevue/button"
import DataTable from "primevue/datatable"
import Column from "primevue/column"

import { useExpensesStore } from "./store/expenses"

const expensesStore = useExpensesStore()

const date = ref(new Date())
const title = ref()
const cost = ref()
const selectedCategory = ref()
const expenses = computed(() => expensesStore.expenses)
const categories = computed(() => expensesStore.categories)

const handleClick = async() => {
  const expense = {
    date: Number(date.value),
    title: title.value,
    category: selectedCategory.value.id,
    cost: Number(cost.value)
  }
  await expensesStore.addExpense(expense)
  await expensesStore.getExpenses()
}

const removeExpense = async(id: number) => {
  await expensesStore.removeExpense(id)
  await expensesStore.getExpenses()
}

onMounted(async() => {
  await Promise.all([
    await expensesStore.getAllCategories(),
    await expensesStore.getExpenses(),
  ])
  console.log(expensesStore.expenses);
})
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>My Finance</h1>
    </header>
    <main>
      <form class="form">
        <DatePicker
          v-model="date"
          class="date-picker"
        />
        <InputText
          class="description"
          type="text"
          v-model="title"
          placeholder="Expense description"
        />
        <Select
          v-model="selectedCategory"
          class="select"
          :options="categories"
          option-label="name"
          placeholder="Category"
        />
        <InputText
          class="cost"
          type="number"
          v-model="cost"
          placeholder="Cost"
        />
        <Button
          @click="handleClick"
        >
          Submit
        </Button>
      </form>

      <DataTable
        v-if="expenses.length"
        :value="expenses"
      >
        <Column field="date" header="Date"/>
        <Column field="title" header="Description"/>
        <Column field="category" header="Category"/>
        <Column field="cost" header="Cost"/>
        <Column header="Action" class="action-column">
          <template #body="{ data: { id }}">
            <Button @click="removeExpense(id)">
              Remove
            </Button>
          </template>
        </Column>
      </DataTable>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}
.app-header {
  width: 100%;
}
.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
}
.date-picker {
  width: 8rem;
}
.description {
  flex-grow: 1;
}
.select {
  margin: 2px;
  width: 12rem;
}
.cost {
  width: 8rem;
}
:deep(.p-select-label) {
  padding-top: 5px;
  padding-bottom: 5px;
}
:deep(.action-column) {
  width: 7rem;
}
</style>
