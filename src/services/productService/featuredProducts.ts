import type {Product} from "@/models/products";
import products from "./products.json";

export const getFeaturedProducts: (() => Product[]) = () => {
  return products;
}