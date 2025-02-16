import { defineStore } from "pinia"
import { ref, computed } from "vue"

import { getCategories, addCategory } from "../api/CategoriesAPI"

export const useCategoriesStore = defineStore("categories", () => {
  const _categories = ref<any[]>([])
  const categories = computed<any[]>(() => _categories.value)

  const getAllCategories = async(): Promise<any[]> => {
    const res = await getCategories()
    _categories.value = res as any[]
    return categories.value
  }
  const _addCategory = async({ name }: { name: string }): Promise<any[]> => {
    await addCategory(name)
    return getAllCategories()
  }

  return {
    categories,
    getAllCategories,
    addCategory: _addCategory,
  }
})
