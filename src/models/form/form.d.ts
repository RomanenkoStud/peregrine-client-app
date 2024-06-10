import { FieldError, UseFormRegister } from "react-hook-form";
import { Category } from "../categories";

export type FormFieldProps<FormData> = {
  type: string;
  placeholder: string;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
};
