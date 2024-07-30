import clsx from "clsx";
import { tv } from "tailwind-variants";

export const FORM_FIELD_WRAPPER_VARIANTS = tv({
  base: clsx("mg-w-full", "mg-flex", "mg-gap-y-1"),
  variants: {
    direction: {
      vertical: clsx("mg-flex-col"),
      horizontal: clsx("mg-flex-row", "mg-items-center", "mg-gap-2"),
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

export const FORM_FIELD_WRAPPER_LABEL_VARIANTS = tv({
  base: clsx("mg-font-semibold"),
  variants: {
    size: {
      xs: clsx("mg-text-xs"),
      sm: clsx("mg-text-sm"),
      md: clsx("mg-text-base"),
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const FORM_FIELD_WRAPPER_DESCRIPTION_VARIANTS = tv({
  base: clsx("mg-text-sm mg-text-gray-700"),
  defaultVariants: {
    size: "sm",
  },
});
