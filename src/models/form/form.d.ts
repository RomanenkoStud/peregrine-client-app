import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  title: string;
  price: string;
  description: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
};

export type ValidFieldNames = "title" | "price" | "description";
