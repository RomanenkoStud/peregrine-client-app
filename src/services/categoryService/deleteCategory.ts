"use server";

import { deleteCategory as deleteCategoryRequest } from "@/controllers/category";

export const deleteCategory = async (id: string) => {
  const deletedCategory = deleteCategoryRequest(id);

  if (!deletedCategory) return { error: "Не вдалось видалити категорію" };

  return { success: "Категорію успішно оновлено!" };
};
