"use server";

import { db } from "@/lib/db";
import { Product } from "@/models/products";

export const createNewProduct = async (data: any) => {
  try {
    const product = await db.product.create({
      data: {
        ...data,
      },
    });

    if (!product) return { error: "Щось пішло не так" };

    return { success: "Продукт створено" };
  } catch (error) {
    console.log("ERROR_CREATE_PRODUCT", error);
    return null;
  }
};

export const fetchAllProducts = async () => {
  try {
    return await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return null;
  }
};

export const fetchAllProductsByQuery = async (query: string) => {
  try {
    return await db.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
