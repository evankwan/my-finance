<script setup>
import PageHeader from "@/components/PageHeader.vue"
import CategoriesList from "@/components/CategoriesList.vue"
import CategoryForm from "@/components/CategoryForm.vue"
</script>

<template>
  <div class="categories-wrapper">
    <PageHeader id="categories-header" heading="Categories" />
    <main>
      <CategoryForm />
      <CategoriesList />
    </main>
  </div>
</template>

<style scoped>
.categories-wrapper {
  width: 100%;
}
</style>