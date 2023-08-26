<script setup>
const props = defineProps({
	heading: {
		type: String,
		required: true,
	}
})
</script>

<template>
	<header class="header-container">
		<h1 id="expenses-title" class="welcome-title">{{ props.heading }}</h1>
	</header>
</template>

<style scoped>
.header-container {
	padding-top: 1rem;
	width: 100%;
	display: block;
	margin-bottom: 2rem;
}

.expenses-title {
	width: 100%;
	text-align: center;
}
</style>