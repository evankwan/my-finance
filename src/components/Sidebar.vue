<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <aside class="sidebar wrapper-border">
    <h2 id="sidebar-title">
      <RouterLink to="/" class="sidebar-item-link">
        MyFinance
      </RouterLink>
    </h2>
    <ul class="sidebar-links">
      <li class="sidebar-item">
        <RouterLink to="/" class="sidebar-item-link">
          Home
        </RouterLink>
      </li>
      <li class="sidebar-item">
        <RouterLink to="/expenses" class="sidebar-item-link">
          Transactions
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
