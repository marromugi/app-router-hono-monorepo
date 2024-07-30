import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const DIALOG_CONTENT_VARIANTS = tv({
  base: clsx('mg-flex-1 mg-overflow-auto', 'mg-bg-gray-50', 'mg-px-4'),
  variants: {
    color: {
      white: clsx('mg-bg-white'),
      gray: clsx('mg-bg-gray-50')
    }
  }
})
