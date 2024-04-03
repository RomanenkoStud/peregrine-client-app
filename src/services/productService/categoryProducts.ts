import type {Product} from "@/models/products";
import products from "./products.json";

export const getCategoryProducts: ((category: string) => Product[]) = (category) => {
  return products.filter(product => product.category === category);
}