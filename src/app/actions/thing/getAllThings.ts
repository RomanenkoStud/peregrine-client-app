"use server";

import {
  fetchAllThings,
  fetchAllThingsByQuery,
} from "@/app/controllets/thing/thing";

export const getAllThings = async (query?: string) => {
  if (!query) {
    return await fetchAllThings();
  }

  return await fetchAllThingsByQuery(query);
};
