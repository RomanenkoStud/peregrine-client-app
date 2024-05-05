import type { Category as CategoryData } from "@prisma/client";
import type { Category } from "@/models/categories";

export const categoryFromData: (category: CategoryData) => Category = (category) => {
  return {
    ...category,
    uri: category.id,
    img:
      category.cover !== null
        ? { src: category.cover, alt: category.title }
        : undefined,
    description: category.description || '',
  };
};
