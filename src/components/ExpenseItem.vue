<script setup>
import { computed, toRef } from "vue"
import { debounce } from "lodash"
import { formatDateToTimestamp, formatTimestampToDate } from "../utilities/dateHelpers"
import { useExpensesStore } from "../store/expenses"

const expensesStore = useExpensesStore()

const categories = computed(() => expensesStore.categories)

const props = defineProps({
  expense: {
    required: true,
    type: Object
  },
})

const emit = defineEmits(["saveExpense"])

const expenseRef = toRef(props, "expense")

const generateDateString = (v) => {
  const convertedDate = formatTimestampToDate(v)
  const num = convertedDate.getUTCDate()
  const month = convertedDate.getUTCMonth() + 1
  const date = `${num < 10 ? "0" + num : num}`
  const year = convertedDate.getUTCFullYear()
  return `${year}-${month}-${date}`
}
const expenseDate = computed({
  get: () => generateDateString(expenseRef.value.date),
  set: (newVal) => {
    const offset = new Date(Date.now()).getTimezoneOffset() / 60
    const expenseDate = new Date(newVal)
    expenseDate.setHours(expenseDate.getHours() + offset)
    expenseRef.value.date = formatDateToTimestamp(expenseDate)
    generateDateString(newVal)
  },
});
const expenseCategory = computed({
  get: () => expensesStore.categories.find((c) => c.id === expenseRef.value.category).id,
  set: (newVal) => expenseRef.value.category = newVal
})

const saveExpense = debounce(() => {
  emit("saveExpense", {
    expense: expenseRef.value
  })
}, 300)
</script>

<template>
  <tr class="table-grid">
    <td class="date-col">
      <input :id="`editing-date-input-${expenseRef.id}`" v-model="expenseDate" class="date-input" type="date"
        name="date-picker" required @change="saveExpense" />
    </td>
    <td class="category-col">
      <select :id="`editing-date-input-${expenseRef.id}`" v-model="expenseCategory" name="categories"
        class="category-input" required @change="saveExpense">
        <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
      </select>
    </td>
    <td class="title-col">
      <input id="title-input" v-model="expenseRef.title" type="text" name="title" placeholder="'Summit Garden'"
        class="title-input" required @input="saveExpense" />
    </td>
    <td class="cost-col">
      <input id="cost-input" v-model="expenseRef.cost" type="number" name="cost" min="0" step="0.01" placeholder="$0"
        class="cost-input" required @input="saveExpense" />
    </td>
  </tr>
</template>

<style scoped>
.table-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  width: 100%;
}

.date-col {
  grid-column: 1 / span 2;
}

.category-col {
  grid-column: 3 / span 2;
}

.title-col {
  grid-column: 5 / span 5;
}

.date-col,
.category-col,
.title-col {
  text-align: left;
}

.cost-col {
  grid-column: 10 / span 2;
  text-align: right;
  position: relative;
}

.action-col {
  grid-column: 12 / span 1;
}

.date-input,
.category-input,
.title-input,
.cost-input {
  padding: 0;
  background: none;
  color: #f9f9f9;
  margin: 0;
}

.cost-input {
  text-align: right;
  padding-left: 1rem;
  width: calc(100% - 1rem);
}

.cost-col::after {
  content: "$";
  font-size: 1rem;
  left: 0;
  top: 2px;
  position: absolute;
  z-index: 10;
}

.cost-input::-webkit-outer-spin-button,
.cost-input::-webkit-inner-spin-button {
  display: none;
}
</style>