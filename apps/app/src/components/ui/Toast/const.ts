import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const TOAST_ICON_VARIANTS = tv({
  base: clsx('mg-size-5'),
  variants: {
    theme: {
      success: clsx('mg-fill-green-600'),
      warning: clsx('mg-fill-yellow-400'),
      error: clsx('mg-fill-red-500')
    }
  }
})

export const TOAST_ICON_CONTAINER_VARIANTS = tv({
  base: clsx(
    'mg-rounded-full',
    'mg-size-10 mg-border-2',
    'mg-bg-white mg-shadow-sm',
    'mg-shrink-0'
  ),
  variants: {
    theme: {
      success: clsx('mg-border-green-100-alpha'),
      warning: clsx('mg-border-yellow-100-alpha'),
      error: clsx('mg-border-red-100-alpha')
    }
  }
})

export const TOAST_VARIANTS = tv({
  base: clsx(
    'mg-rounded-xl',
    'mg-w-[90vw]',
    'mg-p-4',
    'mg-border-2 mg-border-white',
    'mg-bg-gradient-to-b',
    'mg-shadow-1 mg-bg-white'
  ),
  variants: {
    isVisible: {
      true: clsx('mg-animate-fade-in-from-b'),
      false: clsx('mg-animate-fade-out-to-b')
    },
    theme: {
      success: clsx('mg-from-green-200-alpha mg-to-green-50-alpha'),
      warning: clsx('mg-from-yellow-200-alpha mg-to-yellow-50-alpha'),
      error: clsx('mg-from-red-200-alpha mg-to-red-50-alpha')
    }
  }
})
