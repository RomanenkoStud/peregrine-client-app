import { FormData } from "@/models/form";
import * as z from "zod";

export const ProductSchema: z.ZodType<FormData> = z.object({
  title: z.string().trim().max(40, { message: "Max length is - 40 symbols" }),
  price: z.string().trim(),
  category: z.string(),
  description: z
    .string()
    .trim()
    .max(500, { message: "Max length is - 500 symbols" }),
});
