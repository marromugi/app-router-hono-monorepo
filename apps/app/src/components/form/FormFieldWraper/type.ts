import type {
  FORM_FIELD_WRAPPER_LABEL_VARIANTS,
  FORM_FIELD_WRAPPER_VARIANTS,
} from "./const";
import type { FieldErrors, FieldValues, Path } from "react-hook-form";
import type { VariantProps } from "tailwind-variants";

export type FormFieldWrapperProps<T extends FieldValues> = {
  names: Path<T>[];
  errors?: FieldErrors<T>;
  label: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  labelClassName?: string;
  showLabel?: boolean;
  showRequired?: boolean;
} & VariantProps<typeof FORM_FIELD_WRAPPER_VARIANTS> &
  VariantProps<typeof FORM_FIELD_WRAPPER_LABEL_VARIANTS>;
