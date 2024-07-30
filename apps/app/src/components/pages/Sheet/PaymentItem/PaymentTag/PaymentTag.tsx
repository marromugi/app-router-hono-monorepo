import { Flex } from '@/components/layouts'
import clsx from 'clsx'
import { PaymentTagProps } from './type'
import { PaymentCategoryIcon } from '@/components/features/payment'
import { Typography } from '@magi-ui/core'

export const PaymentTag = ({ label }: PaymentTagProps) => {
  return (
    <Flex
      align={'center'}
      gap={1}
      className={clsx('mg-px-2 mg-rounded-full', 'mg-bg-gray-50')}
    >
      <Typography
        size={'xs'}
        theme={'description'}
        className={clsx('!mg-text-[10px]')}
      >
        {label}
      </Typography>
    </Flex>
  )
}
