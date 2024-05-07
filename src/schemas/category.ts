import { Category } from "@/models/categories";

import * as z from "zod";

export const CategorySchema: z.ZodType<Category> = z.object({
  title: z.string(),
  img: z.optional(z.object({ src: z.string(), alt: z.string() })),
  description: z.string(),
  uri: z.optional(z.string()),
});
