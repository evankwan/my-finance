<script setup lang="ts">
import { ref, computed } from "vue"
import Panel from "primevue/panel"

import { useExpensesStore } from "../store/expenses"
import { getMonthName } from "../utilities/dateHelpers"

const expensesStore = useExpensesStore()
expensesStore.setExpensesFilters({ month: 1 })

const totalExpensesForMonth = ref("$2,463.97")

const currentMonth = computed(() => {
  return expensesStore.expensesMonthFilter
    ? getMonthName(expensesStore.expensesMonthFilter)
    : "Monthly"
})
const heading = computed<string>(() => {
  return `${currentMonth.value} expenses`
})
</script>

<template>
  <div>
    <h2>
      {{ heading }}
    </h2>
    <section
      aria-label="monthly expenses panels"
    >
      <Panel
        header="Total expenses"
        class="total-expenses-panel"
      >
        <p class="total-expenses-text">{{ totalExpensesForMonth }}</p>
      </Panel>
    </section>
    <section aria-label="monthly expenses by category">

    </section>
  </div>
</template>
<style scoped>

.total-expenses-panel {
  width: 15rem;
}
.total-expenses-text {
  margin: 0.5rem 0;
  font-size: 2rem;
  font-weight: bold;
}
</style>
