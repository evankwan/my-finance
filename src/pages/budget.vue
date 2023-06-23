<script setup>
import PageHeader from "@/components/PageHeader.vue"
import BudgetWrapper from "@/components/BudgetWrapper.vue"
</script>

<template>
  <div class="budget-wrapper">
    <PageHeader id="budget-header" heading="Budget" />
    <main>
      <BudgetWrapper />
    </main>
  </div>
</template>

<style scoped>
.budget-wrapper {
  width: 100%;
}
</style>
