/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ProductSchema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, useFormField } from "@/components/ui";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useTransition } from "react";
import { Category } from "@/models/categories";
import { Product } from "@/models/products";
import { FormSuccess, FormError } from "@/components/forms";
import { CategoryModal } from "@/components/categories";
import { createProduct, editProduct, deleteProduct } from "@/services/productService";
import { useRouter } from "next/navigation";

type FormProduct = Pick<Product, "id" | "title" | "description" | "category" | "price" | "cover">;

interface ProductFormProps {
  categories?: Category[];
  product?: FormProduct;
  type?: "edit"|"create"|"delete";
}

type SubmitHandler = (values: z.infer<typeof ProductSchema>) => Promise<any>;

const defaultProduct: FormProduct = {
  id: "",
  title: "",
  description: "",
  category: "",
  price: 0,
  cover: {src: "", alt: ""},
};

export const ProductForm = ({ 
  type = "create",
  categories = [], 
  product = defaultProduct,
}: ProductFormProps) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price?.toString(),
      cover: product.cover?.src,
    },
  });

  const title: { [key in Required<ProductFormProps>["type"]]: string } = {
    "create" : "Add product",
    "edit": "Edit product",
    "delete": "Delete product"
  }
  
  const onSubmit:  { [key in Required<ProductFormProps>["type"]]: SubmitHandler } = {
    "create": (data) => createProduct(data),
    "edit": (data) => editProduct(product.id, data),
    "delete": (_data) => deleteProduct(product.id),
  }

  const handleSubmit = async (values: z.infer<typeof ProductSchema>) => {
    startTransition(() =>
      onSubmit[type](values)
        .then((data) => {
          setError(data?.error as string);
          setSuccess(data?.success as string);
          router.push('/admin/products');
          router.refresh();
        })
        .catch(() => setError("Something went wrong!"))
        .finally(() =>
          setTimeout(() => {
            setError("");
            setSuccess("");
          }, 1000)
        )
    );
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const inputClass = "text-black border rounded-xl";

  const renderFormBody = () => {
    switch(type) {
      case "create":
      case "edit":
        return (
          <>
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
                      defaultSelectedKeys={field.value ? [field.value] : []}
                      className={inputClass}
                      disabled={isPending}
                    >
                      {categories.map((category) => (
                        <SelectItem
                          key={category.uri}
                          value={category.uri}
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
          </>
        );
      case "delete": {
        return (
          <>
            <p className="text-xl text-center text-black font-medium">
              Do you really want to delete {product.title} from {product.category}?
            </p>
          </>
        )
      }
      default: 
        return null;
    };
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col max-w-[840px] mx-auto w-full space-y-4 bg-white shadow-md p-10 rounded-2xl "
        >
          <h2 className="text-2xl text-center text-black font-medium">
            {title[type]}
          </h2>
          
          {renderFormBody()}

          <Button
            className="w-[200px] self-end text-white text-base font-medium"
            type="submit"
            disabled={
              form.getValues().title === "" ||
              form.getValues().category === "" ||
              form.getValues().price === ""
            }
          >
            Submit
          </Button>

          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </form>
      </Form>
      <CategoryModal isModalOpen={isOpen} onOpenChange={handleCloseModal} />
    </>
  );
};
