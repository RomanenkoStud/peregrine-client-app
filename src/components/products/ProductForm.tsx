"use client";

import { ProductSchema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormField from "../forms/FormField";
import { createNewProduct } from "@/controllers/product/product";
import { useTransition } from "react";
import { revalidatePath } from "next/cache";
import { originalPathname } from "next/dist/build/templates/app-page";
import actionRevalidate from "@/controllers/revalidate";

export const ProductForm = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    startTransition(() => {
      createNewProduct(values)
        .then((data) => console.log(data?.success))
        .catch((data) => console.error(data?.error))
        .finally(() => {
          reset();
          actionRevalidate("test");
        });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <FormField
          type="text"
          placeholder="Назва"
          name="title"
          register={register}
          error={errors.title}
          className="text-black"
        />
        <FormField
          type="text"
          placeholder="Ціна"
          name="price"
          register={register}
          error={errors.price}
          className="text-black"
        />
        <FormField
          type="text"
          placeholder="Введіть опис"
          name="description"
          register={register}
          error={errors.description}
          className="text-black"
        />
        <button type="submit" className="bg-black p-2 rounded-full">
          Зберегти
        </button>
      </form>
    </>
  );
};
