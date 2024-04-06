import { FormData } from "@/types/types";
import * as z from "zod";

export const ProductSchema: z.ZodType<FormData> = z.object({
  title: z.string().trim(),
  price: z.string().trim(),
  description: z.string().trim(),
});
