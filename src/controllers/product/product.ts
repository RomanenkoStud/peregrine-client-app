"use server";

import { unstable_noStore as noStore } from 'next/cache';
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas/product";

import * as z from "zod";

export const updateProduct = async (productId: string, data: z.infer<typeof ProductSchema>) => {
  noStore();
  try {
    const productToUpdate = await db.product.findUnique({
      where: { id: productId },
    });

    if (!productToUpdate) return { error: "Продукт не знайдено" };

    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: {
        ...data,
        price: parseFloat(data.price),
      },
    });

    if (!updatedProduct) return { error: "Помилка оновлення продукту" };

    return { success: "Продукт оновлено" };
  } catch (error) {
    console.error("ERROR_EDIT_PRODUCT", error);
    return null;
  }
};

export const deleteProduct = async (productId: string) => {
  noStore();
  try {
    const productToDelete = await db.product.findUnique({
      where: { id: productId },
    });

    if (!productToDelete) return { error: "Продукт не знайдено" };

    const deletedProduct = await db.product.delete({
      where: { id: productId }
    });

    if (!deletedProduct) return { error: "Помилка видалення продукту" };

    return { success: "Продукт видалено" };
  } catch (error) {
    console.error("ERROR_DELETE_PRODUCT", error);
    return null;
  }
};

export const createNewProduct = async (data: z.infer<typeof ProductSchema>) => {
  noStore();
  try {
    const product = await db.product.create({
      data: {
        ...data,
        id: encodeURIComponent(data.title),
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
  noStore();
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
  noStore();
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
