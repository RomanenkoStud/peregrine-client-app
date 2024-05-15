"use server";

import { createNewCategory } from "@/controllers/category";
import { CategorySchema } from "@/schemas/category";

import * as z from "zod";

export const createCategory = async (data: z.infer<typeof CategorySchema>) => {
  const validatedFields = CategorySchema.safeParse(data);

  if (!validatedFields.success) return { error: "Невірні дані" };

  const newCategory = createNewCategory(data);

  if (!newCategory) return { error: "Не вдалось створити категорію" };

  return { success: "Категорію успішно створено!" };
};
