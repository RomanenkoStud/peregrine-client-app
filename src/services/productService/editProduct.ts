"use server";

import { updateProduct } from "@/controllers/product";
import { ProductSchema } from "@/schemas/product";
import * as z from "zod";

export const editProduct = async (id: string, data: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Невірні дані" };

  const newThing = updateProduct(id, data);

  if (!newThing) return { error: "Не вдалось оновити річ" };

  return { success: "Річ успішно оновлено!" };
};
