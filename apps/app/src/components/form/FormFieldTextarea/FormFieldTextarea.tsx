import { TextArea } from "@magi-ui/core";
import { useController } from "react-hook-form";

import { FormFieldWrapper } from "..";

import type { FormFieldTextProps } from "./type";
import type { FieldValues } from "react-hook-form";

export const FormFieldTextarea = <T extends FieldValues>({
  name,
  label,
  errors,
  control,
  description,
  required,
  showLabel,
  showRequired,
  ...props
}: FormFieldTextProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <FormFieldWrapper
      label={label}
      errors={errors}
      names={[name]}
      description={description}
      required={required}
      showLabel={showLabel}
      showRequired={showRequired}
    >
      <TextArea
        {...props}
        {...field}
        required={required}
        disabled={props.disabled}
        error={!!errors && !!errors[name]}
      />
    </FormFieldWrapper>
  );
};
