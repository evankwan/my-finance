<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"

const sidebarLinks = computed(() => ([
  { path: "/", name: "Home" },
  { path: "/expenses", name: "Transactions" },
  { path: "/charts", name: "Charts" },
]))
</script>

<template>
  <aside class="sidebar wrapper-border">
    <h2 id="sidebar-title">
      <RouterLink to="/" class="sidebar-item-link">
        MyFinance
      </RouterLink>
    </h2>
    <ul class="sidebar-links">
      <li v-for="link in sidebarLinks" class="sidebar-item">
        <RouterLink :to="link.path" class="sidebar-item-link">
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped scss>
.sidebar {
  height: 100vh;
  width: 15rem;
  flex-grow: 0;
  padding: 1rem;
  margin-right: 2rem;
}

.wrapper-border {
  border-right: 1px #f9f9f9 solid;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  row-gap: 0.5rem;
  padding: 0;
}

.sidebar-item {
  list-style: none;
}

.sidebar-item-link {
  text-decoration: none;
  color: #f9f9f9;
  cursor: pointer;
}
</style>
