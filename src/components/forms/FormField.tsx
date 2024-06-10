import { FormFieldProps } from "@/models/form";
import { ReactElement } from "react";

const FormField: <FormData>(props: FormFieldProps<FormData>) => ReactElement = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
}) => (
  <>
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
