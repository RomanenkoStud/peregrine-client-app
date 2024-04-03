import type {Category} from "@/models/categories";
import categories from "./categories.json";

export const getCategory: ((uri: string) => Category|undefined) = (uri) => {
  return categories.find(categories => categories.uri === uri);
}