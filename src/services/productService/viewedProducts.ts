'use server';
import { cookies } from "next/headers";
import { Product } from "@/models/products";

export async function setViewedProducts(uri: string) {
  const {get, set} = cookies();
  const viewedProductsData = get('viewedProducts')?.value;
  if(viewedProductsData) {
    const viewedProducts = JSON.parse(viewedProductsData);
    set("viewedProducts", JSON.stringify(Array.from(new Set([...viewedProducts, uri]))));
  } else {
    set("viewedProducts", JSON.stringify([uri]));
  }
}

export async function getViewedProducts(): Promise<string[]> {
  const {get} = cookies();
  const viewedProductsData = get('viewedProducts')?.value;
  if(viewedProductsData) {
    return JSON.parse(viewedProductsData);
  } else {
    return [];
  }
}