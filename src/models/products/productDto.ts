import type {Product as ProductData} from "@prisma/client";
import type {Product} from "@/models/products";

export const productFromData: ((product: ProductData) => Product) = (product) => {
  return {
    ...product, 
    category: product.typeId || undefined, 
    uri: product.id,
    cover: product.cover !== null ? {src: product.cover, alt: product.title} : undefined,
    images: product.images.map(src => ({src, alt: product.title})),
    description: product.description || undefined,
  };
}