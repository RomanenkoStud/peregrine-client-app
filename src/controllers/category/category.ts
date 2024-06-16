"use server";

import { unstable_noStore as noStore } from 'next/cache';
import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas/category";
import * as z from "zod";

export const createNewCategory = async (
  data: z.infer<typeof CategorySchema>
) => {
  noStore();
  try {
    const category = await db.category.create({
      data: {
        ...data,
        id: encodeURIComponent(data.title),
      },
    });

    if (!category) return { error: "Щось пішло не так" };

    return { success: "Категорію додано" };
  } catch (error) {
    console.log("ERROR_CREATE_CATEGORY", error);
    return null;
  }
};

export const updateCategory = async (categoryId: string, data: z.infer<typeof CategorySchema>) => {
  noStore();
  try {
    const categoryToUpdate = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryToUpdate) return { error: "Категорію не знайдено" };

    const updatedCategory = await db.category.update({
      where: { id: categoryId },
      data: {
        ...data,
      },
    });

    if (!updatedCategory) return { error: "Помилка оновлення категорії" };

    return { success: "Категорію оновлено" };
  } catch (error) {
    console.error("ERROR_EDIT_CATEGORY", error);
    return null;
  }
};

export const deleteCategory = async (categoryId: string) => {
  noStore();
  try {
    const categoryToDelete = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryToDelete) return { error: "Категорію не знайдено" };

    const deletedCategory = await db.category.delete({
      where: { id: categoryId }
    });

    if (!deletedCategory) return { error: "Помилка видалення категорії" };

    return { success: "Категорію видалено" };
  } catch (error) {
    console.error("ERROR_DELETE_CATEGORY", error);
    return null;
  }
};

export const fetchAllCategories = async () => {
  noStore();
  try {
    return await db.category.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    return null;
  }
};

export const fetchAllCategoriesByQuery = async (query: string) => {
  noStore();
  try {
    return await db.category.findMany({
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
        id: "desc",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
