/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { CategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, useFormField } from "@/components/ui";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useState, useTransition } from "react";
import { Category } from "@/models/categories";
import { FormSuccess, FormError } from "@/components/forms";
import { CategoryModal } from "@/components/categories";
import { createCategory, editCategory, deleteCategory } from "@/services/categoryService";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  category?: Category;
  type?: "edit"|"create"|"delete";
}

type SubmitHandler = (values: z.infer<typeof CategorySchema>) => Promise<any>;

const defaultCategory: Category = {
  title: "",
  description: "",
  img: {src: "", alt: ""},
  uri: "",
};

export const CategoryForm = ({ 
  type = "create",
  category = defaultCategory,
}: CategoryFormProps) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: category.title,
      description: category.description,
      cover: category.img?.src,
    },
  });

  const title: { [key in Required<CategoryFormProps>["type"]]: string } = {
    "create" : "Add product",
    "edit": "Edit product",
    "delete": "Delete product"
  }
  
  const onSubmit:  { [key in Required<CategoryFormProps>["type"]]: SubmitHandler } = {
    "create": (data) => createCategory(data),
    "edit": (data) => editCategory(category.uri, data),
    "delete": (_data) => deleteCategory(category.uri),
  }

  const handleSubmit = async (values: z.infer<typeof CategorySchema>) => {
    startTransition(() =>
      onSubmit[type](values)
        .then((data) => {
          setError(data?.error as string);
          setSuccess(data?.success as string);
          router.push('/admin/categories');
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
              Do you really want to delete {category.title}?
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
              form.getValues().cover === ""
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
