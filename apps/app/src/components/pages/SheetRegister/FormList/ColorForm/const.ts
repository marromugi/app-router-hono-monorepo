import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const COLOR_BADGE_VARIANTS = tv({
  base: clsx('mg-size-10 mg-block', 'mg-rounded-full', 'mg-bg-gradient-to-tr'),
  variants: {
    color: {
      red: 'mg-from-red-300-alpha mg-to-red-600',
      blue: 'mg-from-blue-300-alpha mg-to-blue-600',
      green: 'mg-from-green-300-alpha mg-to-green-600',
      purple: 'mg-from-purple-300-alpha mg-to-purple-600',
      yellow: 'mg-from-yellow-300-alpha mg-to-yellow-600',
      lime: 'mg-from-lime-300-alpha mg-to-lime-600'
    }
  }
})

export const COLOR_BOX_VARIANTS = tv({
  base: clsx('mg-h-16 mg-rounded-xl', 'mg-bg-gray-50', 'mg-transition-all mg-ease-bounce', 'hover:mg-scale-105'),
  variants: {
    color: {
      red: 'aria-checked:mg-bg-red-100',
      blue: 'aria-checked:mg-bg-blue-100',
      green: 'aria-checked:mg-bg-green-100',
      purple: 'aria-checked:mg-bg-purple-100',
      yellow: 'aria-checked:mg-bg-yellow-100',
      lime: 'aria-checked:mg-bg-lime-100'
    }
  }
})
