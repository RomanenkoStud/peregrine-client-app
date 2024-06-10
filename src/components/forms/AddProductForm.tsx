/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ProductSchema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, useFormField } from "../ui/form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { createProduct } from "@/services/productService";
import { useState, useTransition } from "react";
import { Category } from "@/models/categories";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { CategoryModal } from "../categories/CategoryModal";

interface AddProductFormProps {
  categories: Category[];
}

export const AddProductForm = ({ categories }: AddProductFormProps) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof ProductSchema>) => {
    createProduct(values)
      .then((data) => {
        setError(data?.error as string);
        setSuccess(data?.success as string);
        form.reset();
      })
      .catch(() => setError("Something went wrong!"))
      .finally(() =>
        setTimeout(() => {
          setError("");
          setSuccess("");
        }, 1000)
      );
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const inputClass = "text-black border rounded-xl";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col max-w-[840px] mx-auto w-full space-y-4 bg-white shadow-md p-10 rounded-2xl "
        >
          <h2 className="text-2xl text-center text-black font-medium">
            Add product
          </h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              const { error } = useFormField();
              return (
                <Input
                  label="Title"
                  type="text"
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  {...field}
                  className={inputClass}
                  disabled={isPending}
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              const { error } = useFormField();
              return (
                <Input
                  label="Price"
                  type="number"
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  {...field}
                  className={inputClass}
                  disabled={isPending}
                />
              );
            }}
          />

          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => {
              const { error } = useFormField();
              return (
                <Input
                  label="Cover"
                  type="text"
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  {...field}
                  className={inputClass}
                  disabled={isPending}
                />
              );
            }}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              const { error } = useFormField();
              return (
                <div className="flex gap-x-2">
                  <Select
                    isRequired
                    label="Category"
                    placeholder="Select a category"
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    {...field}
                    value={""}
                    className={inputClass}
                    disabled={isPending}
                  >
                    {categories.map((category) => (
                      <SelectItem
                        key={category.title}
                        value={category.title}
                        className="bg-slate-200 p-3 text-black  text-base font-medium"
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button
                    variant="ghost"
                    className="self-end shrink-0 text-sm font-medium"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    Add category +
                  </Button>
                </div>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              const { error } = useFormField();
              return (
                <Textarea
                  label="Description"
                  type="text"
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  {...field}
                  className={inputClass}
                  disabled={isPending}
                />
              );
            }}
          />
          <Button
            className="w-[200px] self-end text-white text-base font-medium"
            type="submit"
            disabled={
              form.getValues().title === "" ||
              form.getValues().description === "" ||
              form.getValues().category === "" ||
              form.getValues().price === ""
            }
          >
            Add
          </Button>

          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </form>
      </Form>
      <CategoryModal isModalOpen={isOpen} onOpenChange={handleCloseModal} />
    </>
  );
};
