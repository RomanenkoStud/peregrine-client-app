"use server";

import { updateCategory } from "@/controllers/category";
import { CategorySchema } from "@/schemas/category";
import * as z from "zod";

export const editCategory = async (id: string, data: z.infer<typeof CategorySchema>) => {
  const validatedFields = CategorySchema.safeParse(data);

  if (!validatedFields.success) return { error: "Невірні дані" };

  const newThing = updateCategory(id, data);

  if (!newThing) return { error: "Не вдалось оновити категорію" };

  return { success: "Категорію успішно оновлено!" };
};
