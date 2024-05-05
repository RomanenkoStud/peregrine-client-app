import { FormData } from "@/models/form";
import * as z from "zod";

export const ProductSchema: z.ZodType<FormData> = z.object({
  title: z.string().trim(),
  price: z.string().trim(),
  description: z.string().trim(),
});
