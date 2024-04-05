import { db } from "@/lib/db";

export const createNewProduct = async (data: any) => {
  try {
    return await db.product.create({
      data: { ...data },
    });
  } catch (error) {
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
