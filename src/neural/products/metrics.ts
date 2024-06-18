import { Product } from '@/models/products';

// Function to calculate similarity based on price range
export function isSimilarPrice(product1: Product, product2: Product): boolean {
  const priceThreshold = 250; // Adjust as per your pricing strategy
  return Math.abs(product1.price - product2.price) <= priceThreshold;
}

// Function to calculate similarity based on title keywords
export function hasCommonKeywords(product1: Product, product2: Product): boolean {
  const keywords1 = product1.description.toLowerCase().split(' ');
  const keywords2 = product2.description.toLowerCase().split(' ');

  // Check for at least one common keyword
  return keywords1.some(keyword => keywords2.includes(keyword));
}

// Function to calculate similarity based on category
export function isSameCategory(product1: Product, product2: Product): boolean {
  return product1.category === product2.category;
}

export function findSimilarProductIndex(product: Product, products: Product[]): number {
  // Find product based on defined similarity metrics
  return products.findIndex(p =>
    p.id !== product.id &&
    isSimilarPrice(product, p) &&
    hasCommonKeywords(product, p) &&
    isSameCategory(product, p)
  );
}