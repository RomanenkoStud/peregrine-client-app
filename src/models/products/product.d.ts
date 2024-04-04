import type {Image} from "../common";

export type Product = {
  title: string;
  cover: Image;
  images?: Image[];
  price: string;
  uri: string;
  description?: string;
  category: string;
}