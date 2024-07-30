import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const FLEX_VARIANTS = tv({
  base: clsx('mg-flex'),
  variants: {
    direction: {
      column: clsx('mg-flex-col'),
      row: clsx('mg-flex-row')
    },
    gap: {
      1: 'mg-gap-1',
      2: 'mg-gap-2',
      3: 'mg-gap-3',
      4: 'mg-gap-4',
      5: 'mg-gap-5',
      6: 'mg-gap-6',
      7: 'mg-gap-7',
      8: 'mg-gap-8'
    },
    justify: {
      center: clsx('mg-justify-center'),
      between: clsx('mg-justify-between'),
      end: clsx('mg-justify-end')
    },
    align: {
      center: clsx('mg-items-center'),
      baseline: clsx('mg-items-baseline'),
      start: clsx('mg-items-start'),
      end: clsx('mg-items-end')
    },
    center: {
      true: clsx('mg-items-center mg-justify-center')
    },
    wrap: {
      true: clsx('mg-flex-wrap'),
      false: clsx('mg-flex-nowrap')
    }
  }
})
