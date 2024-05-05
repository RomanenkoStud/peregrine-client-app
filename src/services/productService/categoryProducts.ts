"use server";

import type {Product} from "@/models/products";
import {productFromData} from "@/models/products";

import {
  fetchAllProducts,
} from "@/controllers/product";

export const getCategoryProducts: ((category: string) => Promise<Product[]>) = async (category) => {
  const products = await fetchAllProducts();
  // replace with fetch by query
  return products?.map(productData => productFromData(productData)).filter(product => product.category === category) ?? [];
}