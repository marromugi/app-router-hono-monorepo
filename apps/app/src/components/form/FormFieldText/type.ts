import { TextFieldProps } from '@magi-ui/core'

import { FormFieldWrapperProps } from '../FormFieldWraper/type'

import type { Diff } from '@/types/util'
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path
} from 'react-hook-form'

type TextFieldPropsWithoutSomeParams = Omit<TextFieldProps, 'error'>

export type FormFieldTextProps<T extends FieldValues> = Pick<
  FormFieldWrapperProps<T>,
  | 'label'
  | 'errors'
  | 'description'
  | 'required'
  | 'showLabel'
  | 'showRequired'
> &
  Diff<
    TextFieldPropsWithoutSomeParams,
    Omit<ControllerRenderProps<T, any>, 'disabled'>
  > & {
    name: Path<T>
    control: Control<T>
  }
