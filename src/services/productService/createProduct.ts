"use server";

import { createNewProduct } from "@/controllers/product/product";
import { ProductSchema } from "@/schemas/product";
// import { revalidatePath } from "next/cache";
import * as z from "zod";

const ProductSchema = z.object({
  title: z.string().trim(),
  price: z.string().trim(),
  description: z.string().trim(),
});

// For now as we have no authorization we won't add Product to CERTAIN user or shop

export const createProduct = async (data: z.infer<typeof ProductSchema>) => {
  console.log(data);

  const validatedFields = ProductSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Невірні дані" };

  const newThing = createNewProduct(data);

  if (!newThing) return { error: "Не вдалось створити річ" };

  //   TODO: add revalidation
  //   revalidatePath("/create");

  return { success: "Річ успішно створено!" };
};
