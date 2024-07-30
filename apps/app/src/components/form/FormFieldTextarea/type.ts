import { TextAreaProps } from '@magi-ui/core'

import { FormFieldWrapperProps } from '../FormFieldWraper/type'

import type { Diff } from '@/types/util'
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path
} from 'react-hook-form'

type TextAreaPropsWithoutSomeParams = Omit<TextAreaProps, 'error'>

export type FormFieldTextProps<T extends FieldValues> = Pick<
  FormFieldWrapperProps<T>,
  | 'label'
  | 'errors'
  | 'description'
  | 'required'
  | 'showRequired'
  | 'showLabel'
> &
  Diff<
    TextAreaPropsWithoutSomeParams,
    Omit<ControllerRenderProps<T, any>, 'disabled'>
  > & {
    name: Path<T>
    control: Control<T>
  }
