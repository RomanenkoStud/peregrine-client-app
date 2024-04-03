import type {Product} from "@/models/products";
import products from "./products.json";

export const getProduct: ((uri: string) => Product|undefined) = (uri) => {
  return products.find(product => product.uri === uri);
}