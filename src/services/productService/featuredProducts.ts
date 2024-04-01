import type {Product} from "@/models/products";

export const getFeaturedProducts: (() => Product[]) = () => {
  return [
    {
      title: "T-shirt",
      img: {
        src: "/products/tshirt-1.avif",
        alt: "t-shirt",
      },
      price: "$25.50",
    },
    {
      title: "Hoodie",
      img: {
        src: "/products/hoodie-1.avif",
        alt: "hoodie",
      },
      price: "$35.00",
    },
    {
      title: "Jeans",
      img: {
        src: "/products/jeans-1.avif",
        alt: "jeans",
      },
      price: "$50.00",
    },
    {
      title: "Bag",
      img: {
        src: "/products/bag-1.avif",
        alt: "bag",
      },
      price: "$45.00",
    },
  ];
}