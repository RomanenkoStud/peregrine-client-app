"use server";

import {
  fetchAllProducts,
  fetchAllProductsByQuery,
} from "@/controllers/product/product";
import {productFromData} from "@/models/products";

export const getAllProducts = async (query?: string) => {
  if (!query) {
    return (await fetchAllProducts())?.map(productData => productFromData(productData)) ?? [];
  }

  return (await fetchAllProductsByQuery(query))?.map(productData => productFromData(productData)) ?? [];
};
