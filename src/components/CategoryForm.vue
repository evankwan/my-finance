<script setup>
import { ref } from "vue"
import { useExpensesStore } from "@/store/expenses.js"

const store = useExpensesStore()

const newCategoryName = ref("")
const handleSubmit = async () => {
	await store.addCategory(newCategoryName.value)
}
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<input v-model="newCategoryName" type="text" name="newCategory" id="new-category-input">
		<button>Add new category</button>
	</form>
</template>

<style lang="scss" scoped></style>