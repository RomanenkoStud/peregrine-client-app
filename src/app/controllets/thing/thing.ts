import { db } from "@/lib/db";

export const createNewThing = async (data: any) => {
  try {
    return await db.thing.create({
      data: { ...data },
    });
  } catch (error) {
    return null;
  }
};

export const fetchAllThings = async () => {
  try {
    return await db.thing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return null;
  }
};

export const fetchAllThingsByQuery = async (query: string) => {
  try {
    return await db.thing.findMany({
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
