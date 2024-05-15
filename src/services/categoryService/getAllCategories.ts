"use server";

import {
  fetchAllCategories,
  fetchAllCategoriesByQuery,
} from "@/controllers/category";
import { Category, categoryFromData } from "@/models/categories";

export const getAllCategories = async (query?: string) => {
  if (!query) {
    return (
      ((await fetchAllCategories())?.map((categoryData) =>
        categoryFromData(categoryData)
      ) as Category[]) ?? []
    );
  }

  return (
    (await fetchAllCategoriesByQuery(query))?.map((categoryData) =>
      categoryFromData(categoryData)
    ) ?? []
  );
};
