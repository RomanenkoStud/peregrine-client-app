"use server";

import { createNewThing } from "@/app/controllets/thing/thing";
// import { revalidatePath } from "next/cache";
import * as z from "zod";

const ThingSchema = z.object({
  title: z.string().trim(),
  price: z.string().trim(),
  description: z.string().trim(),
});

// For now as we have no authorization we won't add thing to CERTAIN user or shop

export const createThing = async (data: z.infer<typeof ThingSchema>) => {
  console.log(data);

  const validatedFields = ThingSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Невірні дані" };

  const newThing = createNewThing(data);

  if (!newThing) return { error: "Не вдалось створити річ" };

  //   TODO: add revalidation
  //   revalidatePath("/create");

  return { success: "Річ успішно створено!" };
};
