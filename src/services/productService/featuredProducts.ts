"use server";

import type {Product} from "@/models/products";

import {getAllProducts} from "./getAllProducts";

export const getFeaturedProducts: (() => Promise<(Product[])>) = async () => {
  return await getAllProducts();
}