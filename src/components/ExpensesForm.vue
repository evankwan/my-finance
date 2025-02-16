<script setup lang="ts">
import { ref, computed } from "vue"
import { Form } from "@primevue/forms"
import DatePicker from "primevue/datepicker"
import InputText from "primevue/inputtext"
import Select from "primevue/select"
import Button from "primevue/button"

import { useCategoriesStore } from "../store/categories"
import { useExpensesStore } from "../store/expenses"
import type { AddExpensePayload } from "../types/expenses"

const categoriesStore = useCategoriesStore()
const categories = computed(() => categoriesStore.categories)

const date = ref(new Date())
const title = ref()
const cost = ref()
const selectedCategory = ref()

const expensesStore = useExpensesStore()
const handleSubmit = async() => {
  if (
    !date.value
    || !title.value
    || !cost.value
  ) {
    return
  }
  const expense: AddExpensePayload = {
    date: Number(date.value),
    title: title.value,
    category: selectedCategory.value?.id || null,
    cost: Number(cost.value)
  }
  await expensesStore.addExpense(expense)
  await expensesStore.getExpenses()
}
</script>

<template>
  <div>
    <Form
        class="form"
        @submit="handleSubmit"
      >
        <DatePicker
          v-model="date"
          name="date"
          required
          class="date-picker"
        />
        <InputText
          v-model="title"
          :formControl="{ validateOnSubmit: true }"
          name="title"
          type="text"
          placeholder="Expense description"
          required
          class="description"
        />
        <Select
          v-model="selectedCategory"
          name="category"
          :options="categories"
          option-label="name"
          placeholder="Category"
          required
          class="select"
        />
        <InputText
          v-model="cost"
          name="cost"
          type="number"
          placeholder="Cost"
          required
          class="cost"
        />
        <Button
          type="submit"
          class="p-button"
        >
          Submit
        </Button>
      </Form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin-bottom: 1rem;
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
