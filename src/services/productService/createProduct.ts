"use server";

import { createNewProduct } from "@/controllers/product";
import { ProductSchema } from "@/schemas/product";
import * as z from "zod";

// For now as we have no authorization we won't add Product to CERTAIN user or shop

export const createProduct = async (data: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Невірні дані" };

  const newThing = createNewProduct(data);

  if (!newThing) return { error: "Не вдалось створити річ" };

  return { success: "Річ успішно створено!" };
};
