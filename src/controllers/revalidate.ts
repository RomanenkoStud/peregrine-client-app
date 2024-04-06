"use server";

import { revalidateTag } from "next/cache";

export default async function actionRevalidate(tag: string) {
  revalidateTag(`${tag}`);
}
