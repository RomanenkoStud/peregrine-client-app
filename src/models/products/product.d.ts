import type { Image } from "../common";

export type Product = {
  id: string;
  title: string;
  cover?: Image;
  images?: Image[];
  price: number;
  uri: string;
  description?: string;
  category?: string;

  createdAt: Date;
};
