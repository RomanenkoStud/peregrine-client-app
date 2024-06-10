import type { Image } from "../common";

export type Category = {
  title: string;
  img?: Image;
  description: string;
  uri?: string;
};

export type CategoryData = {
  title: string;
  cover?: string;
  description: string;
}
