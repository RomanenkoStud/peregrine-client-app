"use server";

import * as tf from '@tensorflow/tfjs';
import { UserData } from '@/models/user';
import { Product } from '@/models/products';
import { loadModel } from '@/neural/products/recommendationClient';
import { getUserId } from "@/services/userService";
import { getViewedProducts, getAllProducts } from "@/services/productService";

let model: tf.LayersModel;

export async function getRecommendedProducts(): Promise<Product[]> {
  try {
    if(!model) {
      model = await loadModel();
    }

    const userData: UserData = await parseUserDataFromCookies();

    return generateRecommendations(model, userData);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

async function generateRecommendations(model: tf.LayersModel, userData: UserData) {
    const PRODUCT_NUMBER = 5;
    const products = await getAllProducts();

   // Create one-hot encoded input for viewed products
    const viewedProductsInput = tf.oneHot(userData.viewedProducts.map(p => products.findIndex(prod => prod.uri === p)), products.length);

    // Predict preference scores for all products
    const predictedPreferences = model.predict(viewedProductsInput) as tf.Tensor<tf.Rank>;
  
    // Find top N products with highest predicted scores
    const topNIndices = tf.topk(predictedPreferences, PRODUCT_NUMBER).indices as tf.Tensor<tf.Rank>;
    const topProducts = topNIndices.dataSync();
    //.map((productIndex) => products[productIndex])

    console.log(topProducts)
  
    return [];
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