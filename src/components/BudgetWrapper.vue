<script setup>
import { ref, onMounted } from "vue"

import { useBudgetsStore } from "@/store/budgets"
import { DEFAULT_BUDGET_ID } from "@/utilities/constants.js"

const budgetsStore = useBudgetsStore()

const categories = ref([])
const currentBudget = ref({})
onMounted(async () => {
  const [_, defaultCategories] = await Promise.all([
    budgetsStore.getBudgets(),
    budgetsStore.getCategories(DEFAULT_BUDGET_ID)
  ])
  categories.value = defaultCategories
  currentBudget.value = budgetsStore.budgets.find(({ id }) => id === DEFAULT_BUDGET_ID)
  console.log({ categories: categories.value })
  console.log({ currentBudget: currentBudget.value })
})

const newCategoryName = ref("")
const newCategoryAmount = ref(0)
const handleAddNewCategory = async () => {
  console.log("add that shit");
  resetNewCateogryForm()
}
const resetNewCateogryForm = () => {
  newCategoryName.value = ""
  newCategoryAmount.value = 0;
}
</script>

<template>
  <div class="budget-inner-wrapper">
    <div class="budget-form-wrapper">
      <h2 class="budget-name">Budget: {{ currentBudget.name }}</h2>
      <table class="category-list">
        <tr class="category-list-row">
          <th id="name-heading" class="name-col">Category name</th>
          <th id="amount-heading" class="amount-col">Amount</th>
          <th id="action-heading" class="action-col">Action</th>
        </tr>
        <tr v-for="category in categories" class="category-list-row">
          <td class="name-col">{{ category.name }}</td>
          <td class="amount-col">{{ category.amount }}</td>
          <td class="action-col"></td>
          <td></td>
        </tr>
        <hr />
        <tr class="category-list-row">
          <td class="name-col">
            <input v-model="newCategoryName" class="category-name-input" type="text" required />
          </td>
          <td class="amount-col">
            <input v-model="newCategoryAmount" class="category-amount-input" type="number" name="cost" min="0" step="0.01"
              placeholder="$0" required />
          </td>
          <td class="action-col">
            <button class="add-category-button" @click="handleAddNewCategory">Add +</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.budget-inner-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
}

.budget-form-wrapper {
  flex-basis: 100%;
}

.budget-name {
  margin-bottom: 2rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  width: 100%;
}

.category-list-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.name-col {
  grid-column: 1 / span 2;
  text-align: left;
}

.amount-col {
  grid-column: 3 / span 2;
  text-align: left;
}

.action-col {
  grid-column: 5 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-col>button {
  margin: 0 auto;
}

hr {
  border: 1px solid #f9f9f9;
  margin: 2rem 0 1rem;
  width: 100%;
}

.category-name-input,
.category-amount-input,
.add-category-button {
  box-sizing: border-box;
  width: 100%;
}
</style>