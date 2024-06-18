import type { Product as ProductData } from "@prisma/client";
import { productFromData } from "@/models/products";
import { UserData } from '@/models/user';
import { faker } from '@faker-js/faker';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

// Read and parse the CSV file
const csvData = fs.readFileSync('datasets/FashionDataset.csv', 'utf-8');

// Define the structure of the CSV data
interface CsvProduct {
  Details: string;
  SellPrice: string;
  Category: string;
}

export function generateProducts(): Partial<ProductData>[] {
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true
  }).map((row: CsvProduct) => ({
    id: faker.database.mongodbObjectId(),
    description: row.Details,
    price: parseFloat(row.SellPrice),
    category: row.Category,
  }));
}

export function generateUser(numProductsPurchased: number, numProductsViewed: number, products: Partial<ProductData>[]): UserData {
  const purchaseHistory = Array.from({ length: numProductsPurchased }, () => {
    // Choose a random product from all available products
    const randomProductIndex = Math.floor(Math.random() * products.length);
    return productFromData(products[randomProductIndex] as ProductData).uri;
  });
  return {
    id: faker.database.mongodbObjectId(),
    purchaseHistory: purchaseHistory,
    viewedProducts: Array.from({ length: numProductsViewed }, () => {
      const viewNonPurchased = faker.datatype.boolean(0.8); // 60% chance of viewing a non-purchased product

      if (viewNonPurchased) {
        // Choose a random product from all available products
        const randomProductIndex = Math.floor(Math.random() * products.length);
        return productFromData(products[randomProductIndex] as ProductData).uri;
      } else {
        // Choose a random product from purchase history
        const randomPurchasedIndex = Math.floor(Math.random() * numProductsPurchased);
        return purchaseHistory[randomPurchasedIndex];
      }
    }),
  };
}