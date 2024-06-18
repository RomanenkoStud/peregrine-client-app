"use server";

import * as tf from '@tensorflow/tfjs';
import { UserData } from '@/models/user';
import { Product } from '@/models/products';
import { loadModel, generateRecommendations } from '@/neural/products';
import { getUserId } from "@/services/userService";
import { getViewedProducts, getAllProducts } from "@/services/productService";

let model: tf.LayersModel;
let products: Product[];

export async function getFeaturedProducts(length?: number): Promise<Product[]> {
  try {
    if(!model) {
      model = await loadModel();
    }
    if(!products) {
      products = (await getAllProducts())
        .map(product => ({...product, description: product.title + ' ' + product.description}));
    }

    const userData: UserData = await parseUserDataFromCookies();

    const data = await generateRecommendations(model, userData, products, length);
    return data;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

async function parseUserDataFromCookies(): Promise<UserData> {
  const userId = await getUserId();
  const viewedProducts = await getViewedProducts();

  return {
    id: userId,
    purchaseHistory: [],
    viewedProducts,
  };
}