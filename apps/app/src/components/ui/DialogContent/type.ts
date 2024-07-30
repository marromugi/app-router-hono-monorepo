import { ComponentProps } from 'react'
import { VariantProps } from 'tailwind-variants'
import { DIALOG_CONTENT_VARIANTS } from './const'

export type DialogContentProps = ComponentProps<'div'> &
  VariantProps<typeof DIALOG_CONTENT_VARIANTS>
