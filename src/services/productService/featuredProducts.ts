import type {Product} from "@/models/products";

export const getFeaturedProducts: (() => Product[]) = () => {
  return [
    {
      title: "Orange",
      img: {
        src: "/products/product-1.jpg",
        alt: "orange",
      },
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: {
        src: "/products/product-2.jpg",
        alt: "tangerine",
      },
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: {
        src: "/products/product-3.jpg",
        alt: "raspberry",
      },
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: {
        src: "/products/product-4.jpg",
        alt: "lemon",
      },
      price: "$5.30",
    },
  ];
}