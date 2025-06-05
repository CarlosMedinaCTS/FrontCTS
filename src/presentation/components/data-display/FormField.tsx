import Input from "@/presentation/components/ui/inputs/Input";
import { Typography } from "@/presentation/components/ui/typography/Typography";
import type { RefObject } from "react";

interface FieldConfig<T> {
  name: keyof T & string;
  label: string;
  placeholder?: string;
  type? : string;
  defaultValue?: string;
  min? : number;
  max?: number;
}

interface FormFieldProps<T extends Record<string, unknown>> {
  field: FieldConfig<T>;
  refInput?: RefObject<HTMLInputElement | null>;
  error?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField = <T extends Record<string, unknown>>({
  field,
  refInput,
  error,
  handleBlur,
}: FormFieldProps<T>) => (
  <div className="flex flex-col mb-5">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {field.label}
    </label>
    <Input
      ref={refInput}
      name={field.name}
      defaultValue={field.defaultValue}
      placeholder={field.placeholder}
      type={field.type || "text"}
      minLength={field.min}
      maxLength={field.max}
      className="placeholder:text-xs"
      onBlur={handleBlur}
    />
    {error && (
      <Typography.P className="text-red-500 text-xs">{error}</Typography.P>
    )}
  </div>
);

export default FormField;