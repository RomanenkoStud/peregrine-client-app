"use server";

import {
  fetchAllCategories,
  fetchAllCategoriesByQuery,
} from "@/controllers/category";
import {categoryFromData} from "@/models/categories";

export const getAllCategories = async (query?: string) => {
  if (!query) {
    return (await fetchAllCategories())?.map(categoryData => categoryFromData(categoryData)) ?? [];
  }

  return (await fetchAllCategoriesByQuery(query))?.map(categoryData => categoryFromData(categoryData)) ?? [];
};