'use client'

import clsx from 'clsx'
import { DialogHeaderProps } from './type'
import { Flex } from '@/components/layouts'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { Typography } from '@magi-ui/core'

export const DialogHeader = ({
  children,
  onClose,
  showClose = true
}: DialogHeaderProps) => {
  return (
    <Flex
      justify={'between'}
      align={'center'}
      className={clsx('mg-p-4 mg-border-b mg-border-gray-100')}
    >
      <Typography
        className={clsx('mg-font-bold')}
        as={'span'}
        size={'lg'}
      >
        {children}
      </Typography>
      <div>
        {showClose && (
          <Flex
            center
            as={'button'}
            type={'button'}
            className={clsx('mg-size-6 mg-bg-gray-50', 'mg-rounded-md')}
            onClick={onClose}
          >
            <XMarkIcon
              className={clsx('mg-size-4', 'mg-text-gray-300')}
            />
          </Flex>
        )}
      </div>
    </Flex>
  )
}
