import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const DIALOG_CONTENT_VARIANTS = tv({
  base: clsx(
    'mg-bg-white',
    'mg-animate-popover-top-fade-in',
    'mg-flex mg-flex-col mg-overflow-auto',
    'mg-rounded-xl',
    'mg-max-h-full'
  ),
  variants: {
    size: {
      lg: clsx('mg-w-full md:mg-max-w-[680px]'),
      md: clsx('mg-w-full mg-max-w-[360px] md:mg-max-w-[540px]'),
      sm: clsx('mg-w-full mg-max-w-[320px] md:mg-max-w-[360px]')
    }
  }
})
