<script setup>
import { computed } from "vue"
import { useExpensesStore } from "@/store/expenses.js"

const store = useExpensesStore()

const categories = computed(() => {
	return store.categories
})

</script>

<template>
	<div class="categoriesList-wrapper">
		<ol>
			<li class="category-item">
				<span class="id-field">ID</span>
				<span>Category name</span>
			</li>
			<li v-for="{ name, id } in categories" :key="`category-${id}`" class="category-item">
				<span class="id-field">{{ id }}</span>
				<span>{{ name }}</span>
			</li>
		</ol>
	</div>
</template>

<style scoped>
.categoriesList-wrapper {
	width: 100%;
}

.category-item {
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: start;
}

.id-field {
	display: block;
	width: 3rem;
}
</style>