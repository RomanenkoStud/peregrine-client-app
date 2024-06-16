"use server";

import { deleteProduct as deleteProductRequest } from "@/controllers/product";

export const deleteProduct = async (id: string) => {
  const deletedThing = deleteProductRequest(id);

  if (!deletedThing) return { error: "Не вдалось видалити річ" };

  return { success: "Річ успішно оновлено!" };
};
