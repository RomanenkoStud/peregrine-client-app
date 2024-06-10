import { CategoryData } from "@/models/categories";

import * as z from "zod";

export const CategorySchema: z.ZodType<CategoryData> = z.object({
  title: z.string(),
  cover: z.string(),
  description: z.string(),
  uri: z.optional(z.string()),
});
