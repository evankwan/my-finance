<script setup lang="ts">
import { onMounted } from "vue"
import { useRoute } from "vue-router"

import SideNavbar from "./components/SideNavbar.vue"

import { useCategoriesStore } from "./store/categories"
import { useExpensesStore } from "./store/expenses"

const route = useRoute()

const categoriesStore = useCategoriesStore()
const expensesStore = useExpensesStore()

onMounted(async() => {
  await Promise.all([
    await categoriesStore.getAllCategories(),
    await expensesStore.getExpenses(),
  ])
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>{{ route.meta.title || "My Finance" }}</h1>
    </header>
    <div class="app-container">
      <aside class="side-navbar">
        <SideNavbar />
      </aside>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}
.app-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  overflow: hidden;
}
.app-header {
  width: 100%;
}
main {
  width: 100%;
}
:deep(.router-link-active) {
  color: var(--base-teal);
  background-color: #27272a;
}
</style>
