import type {Category} from "@/models/categories";
import categories from "./categories.json";

export const getCategories: (() => Category[]) = () => {
  return categories;
}