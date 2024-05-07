import { FieldError, UseFormRegister } from "react-hook-form";
import { Category } from "../categories";

export type FormData = {
  title: string;
  price: string;
  category: string;
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
