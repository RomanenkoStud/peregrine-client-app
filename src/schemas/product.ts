import { ProductData } from "@/models/products";
import * as z from "zod";

export const ProductSchema: z.ZodType<ProductData> = z.object({
  title: z.string().trim().max(40, { message: "Max length is - 40 symbols" }),
  price: z.string().trim(),
  category: z.string(),
  description: z
    .string()
    .trim()
    .max(500, { message: "Max length is - 500 symbols" }),
  cover: z.string(),
});
