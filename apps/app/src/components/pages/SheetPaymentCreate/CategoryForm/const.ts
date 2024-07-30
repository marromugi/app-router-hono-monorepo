import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const CATEGORY_BADGE_VARIANTS = tv({
  base: clsx(
    'mg-size-10 mg-block',
    'mg-rounded-full',
    'mg-bg-gradient-to-tr'
  ),
  variants: {
    color: {
      play: 'mg-from-red-300-alpha mg-to-red-600',
      eat: 'mg-from-blue-300-alpha mg-to-blue-600',
      house: 'mg-from-green-300-alpha mg-to-green-600',
      socks: 'mg-from-purple-300-alpha mg-to-purple-600',
      train: 'mg-from-yellow-300-alpha mg-to-yellow-600'
    }
  }
})

export const CATEGORY_BOX_VARIANTS = tv({
  base: clsx(
    'mg-py-2 mg-rounded-xl',
    'mg-bg-gray-50',
    'mg-transition-all mg-ease-bounce',
    'hover:mg-scale-105'
  ),
  variants: {
    color: {
      play: 'aria-checked:mg-bg-red-100',
      eat: 'aria-checked:mg-bg-blue-100',
      house: 'aria-checked:mg-bg-green-100',
      'daily-use-items': 'aria-checked:mg-bg-purple-100',
      travel: 'aria-checked:mg-bg-yellow-100'
    }
  }
})
