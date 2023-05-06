<script setup>
import { onMounted } from "vue"
import SideBar from "./components/Sidebar.vue"
import { RouterView } from "vue-router"

import { useExpensesStore } from "./store/expenses"

const expensesStore = useExpensesStore()

onMounted(async () => {
  await Promise.all([
    expensesStore.getCategories(),
    expensesStore.getExpenses()
  ])
})
</script>

<template>
  <div class="wrapper">
    <SideBar class="sidebar" />
    <RouterView class="main-view" />
  </div>
</template>

<style scoped>
.wrapper {
  width: calc(100vw - 2rem);
  max-width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
