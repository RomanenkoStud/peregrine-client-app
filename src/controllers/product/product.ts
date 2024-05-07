"use server";

import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas/product";

import * as z from "zod";

export const createNewProduct = async (data: z.infer<typeof ProductSchema>) => {
  try {
    const product = await db.product.create({
      data: {
        ...data,
        price: parseFloat(data.price),
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
