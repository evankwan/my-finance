<script setup>

</script>

<template>
  <div class="welcome-container">
    <h1 id="welcome-title" class="welcome-title">Welcome to MyFinance</h1>
    <h2 id="welcome-subtitle" class="welcome-subtitle">What do you want to do today?</h2>
    <div class="buttons-container">
      <button @click="$router.push('/expenses')">
        Expenses
      </button>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
}

.welcome-title {
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
}

.welcome-subtitle {
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
  font-weight: 400;
}
</style>