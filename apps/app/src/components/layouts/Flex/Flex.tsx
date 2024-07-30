import { ElementType, createElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { FLEX_VARIANTS } from './const'
import { FlexProps } from './type'

export const Flex = <T extends ElementType>({
  as,
  direction,
  gap,
  justify,
  align,
  center,
  wrap,
  ...props
}: FlexProps<T>) => {
  return createElement(as ?? 'div', {
    ...props,
    className: twMerge(FLEX_VARIANTS({ direction, gap, center, align, justify, wrap }), props.className)
  })
}
