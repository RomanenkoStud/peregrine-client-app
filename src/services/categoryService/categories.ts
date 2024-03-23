import type {Category} from "@/models/categories";

export const getCategories: (() => Category[]) = () => {
  return [
    {
      title: "Orange",
      img: {
        src: "/products/product-1.jpg",
        alt: "orange",
      },
      description: "Orange",
    },
    {
      title: "Tangerine",
      img: {
        src: "/products/product-2.jpg",
        alt: "tangerine",
      },
      description: "Tangerine",
    },
    {
      title: "Raspberry",
      img: {
        src: "/products/product-3.jpg",
        alt: "raspberry",
      },
      description: "Raspberry",
    },
    {
      title: "Lemon",
      img: {
        src: "/products/product-4.jpg",
        alt: "lemon",
      },
      description: "Lemon",
    },
  ];
}