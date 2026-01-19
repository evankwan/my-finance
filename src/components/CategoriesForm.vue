<script setup lang="ts">
import { ref, computed } from "vue"
import { Form } from "@primevue/forms"
import InputText from "primevue/inputtext"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Button from "primevue/button"

import { useCategoriesStore } from "../store/categories"
import { useExpensesStore } from "../store/expenses"

const categoriesStore = useCategoriesStore()
const categories = computed(() => categoriesStore.categories)

const expensesStore = useExpensesStore()

const name = ref<string>("")
const handleSubmit = async() => {
  const trimmedName = name.value.trim()
  if (!trimmedName) {
    return
  }

  await categoriesStore.addCategory({ name: trimmedName })
}

const removeCategory = async(id: number) => {
  await categoriesStore.removeCategory({ id })
  await expensesStore.getExpenses()
}
</script>

<template>
  <div>
    <Form
      class="form"
      @submit="handleSubmit"
    >
        <InputText
          v-model="name"
          :formControl="{ validateOnSubmit: true }"
          name="name"
          type="text"
          placeholder="Category name"
          required
          class="name"
        />
        <Button
          type="submit"
          class="p-button"
        >
          Submit
        </Button>
    </Form>
    <DataTable
      v-if="categories.length"
      :value="categories"
    >
      <Column field="name" header="Category name"/>
      <Column header="Action" class="action-column">
        <template #body="{ data: { id }}">
          <Button @click="removeCategory(id)">
            Remove
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.form {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin-bottom: 1rem;
}
.name {
  flex-grow: 1;
}
</style>