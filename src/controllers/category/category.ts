"use server";

import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas/category";
import * as z from "zod";

export const createNewCategory = async (
  data: z.infer<typeof CategorySchema>
) => {
  try {
    const category = await db.category.create({
      data: {
        ...data,
      },
    });

    if (!category) return { error: "Щось пішло не так" };

    return { success: "Категорію додано" };
  } catch (error) {
    console.log("ERROR_CREATE_CATEGORY", error);
    return null;
  }
};

export const fetchAllCategories = async () => {
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
