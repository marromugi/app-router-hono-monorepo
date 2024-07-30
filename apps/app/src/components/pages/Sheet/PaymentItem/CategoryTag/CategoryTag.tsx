import { Flex } from '@/components/layouts'
import clsx from 'clsx'
import { CategoryTagProps } from './type'
import { PaymentCategoryIcon } from '@/components/features/payment'
import { Typography } from '@magi-ui/core'

export const CategoryTag = ({ category, label }: CategoryTagProps) => {
  return (
    <Flex
      align={'center'}
      gap={1}
      className={clsx(
        'mg-py-1 mg-px-2 mg-rounded-full',
        'mg-bg-gray-100'
      )}
    >
      <div className={clsx('mg-size-4')}>
        <PaymentCategoryIcon category={category} />
      </div>
      <Typography size={'xs'} theme={'description'}>
        {label}
      </Typography>
    </Flex>
  )
}
