import type {Category} from "@/models/categories";
import {categoryFromData} from "@/models/categories";

import {
  fetchAllCategories,
} from "@/controllers/category";

export const getCategory: ((uri: string) => Promise<Category|undefined>) = async (uri) => {
  const categories = await fetchAllCategories();
  // replace with fetch by query
  return categories?.map(categoryData => categoryFromData(categoryData)).find(category => category.uri === uri);
}