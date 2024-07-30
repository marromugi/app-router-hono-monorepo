import { Typography } from '@magi-ui/core'
import clsx from 'clsx'

import {
  FORM_FIELD_WRAPPER_DESCRIPTION_VARIANTS,
  FORM_FIELD_WRAPPER_LABEL_VARIANTS,
  FORM_FIELD_WRAPPER_VARIANTS
} from './const'

import type { FormFieldWrapperProps } from './type'
import type { FieldValues } from 'react-hook-form'

export const FormFieldWrapper = <T extends FieldValues>({
  names,
  errors,
  label,
  description,
  direction,
  size,
  required,
  className,
  labelClassName,
  showLabel = true,
  showRequired = false,
  children
}: FormFieldWrapperProps<T>) => {
  return (
    <>
      <div
        className={clsx(
          FORM_FIELD_WRAPPER_VARIANTS({ direction }),
          className
        )}
      >
        {showLabel && (
          <div className={clsx('mg-flex mg-items-center mg-gap-2')}>
            <span
              className={clsx(
                FORM_FIELD_WRAPPER_LABEL_VARIANTS({ size }),
                labelClassName
              )}
            >
              {label}
            </span>
            {required && showRequired && (
              <Typography
                as={'span'}
                size={'xs'}
                theme={'fill'}
                className={clsx(
                  'mg-rounded-full mg-bg-red-600 mg-px-4 mg-font-bold'
                )}
              >
                必須
              </Typography>
            )}
          </div>
        )}
        {children}
        {description && (
          <p
            className={clsx(FORM_FIELD_WRAPPER_DESCRIPTION_VARIANTS())}
          >
            {description}
          </p>
        )}
        {names.map((name) => (
          <>
            {errors && errors[name] && (
              <Typography as={'p'} size={'sm'} theme={'alert'}>
                {errors[name]?.message?.toString()}
              </Typography>
            )}
          </>
        ))}
      </div>
    </>
  )
}
