import { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { VariantProps } from 'tailwind-variants'

import { FLEX_VARIANTS } from './const'

type Element = React.ElementType<any, keyof React.JSX.IntrinsicElements>

export type FlexProps<T extends Element = 'div'> = VariantProps<
  typeof FLEX_VARIANTS
> &
  Omit<
    T extends keyof JSX.IntrinsicElements
      ? ComponentProps<T>
      : ComponentPropsWithoutRef<T>,
    'as'
  > & {
    as?: T
  }
