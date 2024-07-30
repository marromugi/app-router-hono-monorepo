import clsx from 'clsx'
import { DialogFooterProps } from './type'
import { Flex } from '@/components/layouts'

export const DialogFooter = ({ children }: DialogFooterProps) => {
  return (
    <Flex
      justify={'end'}
      className={clsx('mg-p-4 mg-border-t mg-border-gray-100')}
    >
      {children}
    </Flex>
  )
}
