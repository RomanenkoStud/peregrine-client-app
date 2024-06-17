'use server';
import { cookies } from "next/headers";

export async function setUserId() {
  if(!cookies().get("userId")) {
    cookies().set("userId", `userId_${crypto.randomUUID()}`);
  }
}

export async function getUserId() {
  return cookies().get("userId") as unknown as string;
}