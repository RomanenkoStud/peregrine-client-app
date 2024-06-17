import type { Product as ProductData } from "@prisma/client";
import { productFromData } from "@/models/products";
import { UserData } from '@/models/user';
import { 
  createDeepAndWideModel, 
  trainModel, 
  generateProduct, 
  generateUser,
} from './products';

const NUM_TRAIN_PRODUCTS = 100;
const NUM_TRAIN_USERS = 100;
const PRODUCTS_PURCHASED = 10;
const PRODUCTS_VIEWED = 20;

// Generate synthetic data
const productData: Partial<ProductData>[] = Array.from({ length: NUM_TRAIN_PRODUCTS }, () => generateProduct());
const products = productData.map(product => productFromData(product as ProductData));

// Generate synthetic users
const users: UserData[] = Array.from({ length: NUM_TRAIN_USERS }, () => generateUser(PRODUCTS_PURCHASED, PRODUCTS_VIEWED, productData));

// Create and train the model
const model = createDeepAndWideModel();
trainModel(model, users, products).then(() => {
  console.log('Model trained successfully!');
});
