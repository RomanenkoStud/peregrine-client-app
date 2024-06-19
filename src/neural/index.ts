import type { Product as ProductData } from "@prisma/client";
import { productFromData } from "@/models/products";
import { UserData } from '@/models/user';
import { 
  createDeepAndWideModel, 
  trainModel, 
  generateProducts, 
  generateUser,
} from './products';

const NUM_TRAIN_PRODUCTS = 100;
const NUM_TRAIN_USERS = 1000;
const PRODUCTS_PURCHASED = 5;
const PRODUCTS_VIEWED = 30;

// Generate synthetic data
const productData: Partial<ProductData>[] = generateProducts().slice(0, NUM_TRAIN_PRODUCTS);
const products = productData.map(product => productFromData(product as ProductData));

// Generate synthetic users
const users: UserData[] = Array.from({ length: NUM_TRAIN_USERS }, () => generateUser(PRODUCTS_PURCHASED, PRODUCTS_VIEWED, products));

// Create and train the model
const model = createDeepAndWideModel();
trainModel(model, users, products).then(() => {
  console.log('Model trained successfully!');
});
