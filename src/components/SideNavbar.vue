<script setup lang="ts">
import Menu from "primevue/menu";

const items = [
	{
		label: "Home",
		route: "/",
	},
	{
		label: "Categories",
		route: "/categories",
	},
	{
		label: "Budget",
		route: "/budget",
	},
	{
		label: "Monthly recap",
		route: "/monthly-recap",
	},
];
</script>

<template>
	<nav class="side-navbar">
		<Menu :model="items">
			<template #item="{ item }">
				<router-link :to="item.route" class="navbar-link">
					{{ item.label }}
				</router-link>
			</template>
		</Menu>
	</nav>
</template>

<style scoped>
.side-navbar {
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.navbar-link {
	display: inline-block;
	width: 100%;
}
</style>
