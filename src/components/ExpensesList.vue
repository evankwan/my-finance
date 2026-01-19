<script setup lang="ts">
import { computed } from "vue"
import Button from "primevue/button"
import DataTable from "primevue/datatable"
import Column from "primevue/column"

import { useExpensesStore } from "../store/expenses"

const expensesStore = useExpensesStore()

const expenses = computed(() => expensesStore.expenses)

const removeExpense = async(id: number) => {
  await expensesStore.removeExpense(id)
  await expensesStore.getExpenses()
}
</script>

<template>
  <div>
    <DataTable
        v-if="expenses.length"
        :value="expenses"
      >
        <Column field="date" header="Date"/>
        <Column field="title" header="Description"/>
        <Column field="category.name" header="Category"/>
        <Column field="cost" header="Cost"/>
        <Column header="Action" class="action-column">
          <template #body="{ data: { id }}">
            <Button @click="removeExpense(id)">
              Remove
            </Button>
          </template>
        </Column>
      </DataTable>
  </div>
</template>

<style scoped>

</style>
