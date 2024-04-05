import type {Image} from "../common";

export type Product = {
  title: string;
  cover?: Image;
  images?: Image[];
  price: number;
  uri: string;
  description?: string;
  category?: string;
}