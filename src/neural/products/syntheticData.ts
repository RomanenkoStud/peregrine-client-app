import type { Product as ProductData } from "@prisma/client";
import { productFromData } from "@/models/products";
import { UserData } from '@/models/user';
import { faker } from '@faker-js/faker';

export function generateProduct(): Partial<ProductData> {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    cover: faker.image.url(),
    images: [faker.image.url(), faker.image.url(), faker.image.url()],
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
  };
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
      const viewNonPurchased = faker.datatype.boolean(0.6); // 60% chance of viewing a non-purchased product

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