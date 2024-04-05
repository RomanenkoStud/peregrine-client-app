"use server";

import type {Product} from "@/models/products";
import {productFromData} from "@/models/products";

import {
  fetchAllProducts,
} from "@/controllers/product/product";

export const getProduct: ((uri: string) => Promise<Product|undefined>) = async (uri) => {
  const products = await fetchAllProducts();
  // replace with fetch by query
  return products?.map(productData => productFromData(productData)).find(product => product.uri === uri);
}