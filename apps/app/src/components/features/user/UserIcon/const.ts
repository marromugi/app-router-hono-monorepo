import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const USER_ICON_VARIANTS = tv({
  base: clsx('mg-block', 'mg-rounded-full', 'mg-bg-gradient-to-tr'),
  variants: {
    color: {
      red: 'mg-from-red-300-alpha mg-to-red-600',
      blue: 'mg-from-blue-300-alpha mg-to-blue-600',
      green: 'mg-from-green-300-alpha mg-to-green-600',
      purple: 'mg-from-purple-300-alpha mg-to-purple-600',
      yellow: 'mg-from-yellow-300-alpha mg-to-yellow-600',
      lime: 'mg-from-lime-300-alpha mg-to-lime-600'
    },
    size: {
      xxs: 'mg-size-4',
      xs: 'mg-size-6',
      sm: 'mg-size-8',
      md: 'mg-size-10'
    }
  }
})
