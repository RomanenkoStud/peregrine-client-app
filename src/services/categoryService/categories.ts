import type {Category} from "@/models/categories";

export const getCategories: (() => Category[]) = () => {
  return [
    {
      title: "Bag",
      img: {
        src: "/categories/bag-1.jpg",
        alt: "bag",
      },
      description: "Bag",
    },
    {
      title: "Hoodie",
      img: {
        src: "/categories/hoodie-1.jpg",
        alt: "hoodie",
      },
      description: "Hoodie",
    },
    {
      title: "Jacket",
      img: {
        src: "/categories/jacket-1.jpg",
        alt: "jacket",
      },
      description: "Jacket",
    },
    {
      title: "T-shirt",
      img: {
        src: "/categories/tshirt-1.jpg",
        alt: "t-shirt",
      },
      description: "T-shirt",
    },
  ];
}