/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, useFormField } from "../ui/form";
import { Button, Input, Textarea } from "@nextui-org/react";

import { useState, useTransition } from "react";

import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

import { CategorySchema } from "@/schemas/category";
import { createCategory } from "@/services/categoryService";

export const CreateCategoryForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const inputClass = "text-black border rounded-xl";

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
      description: "",
      cover: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof CategorySchema>) => {
    startTransition(() =>
      createCategory(values)
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
        )
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col w-full space-y-4 py-2"
      >
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

        <Button
          className="text-white text-base font-medium"
          type="submit"
          disabled={
            form.getValues().description === "" || form.getValues().title === ""
          }
        >
          Add
        </Button>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </form>
    </Form>
  );
};
