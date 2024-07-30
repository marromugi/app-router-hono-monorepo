'use client'

import { Flex } from '@/components/layouts'
import { Typography, useDisclosure } from '@magi-ui/core'
import clsx from 'clsx'
import { format } from 'date-fns'
import { PaymentBarProps } from './type'
import { DeleteModal } from './DeleteModal'

export const PaymentBar = ({ title, price, createdAt, isMe }: PaymentBarProps) => {
  const { isOpen, change, open } = useDisclosure()
  return (
    <>
      <Flex
        align={'center'}
        justify={'between'}
        className={clsx(
          'mg-bg-white',
          'mg-rounded-xl mg-h-20 mg-px-4',
          'mg-max-w-[420px]',
          'mg-w-5/6',
          typeof isMe === 'undefined' ? '' : isMe ? 'mg-ml-auto' : 'mg-mr-auto'
          // typeof isMe === 'undefined' ? '' : isMe ? 'mg-ml-auto mg-mr-6' : 'mg-mr-auto mg-ml-6'
        )}
        onClick={open}
      >
        <Flex direction={'column'}>
          <Typography size={'sm'} className={clsx('mg-font-semibold')}>
            {title}
          </Typography>
          <Typography size={'xs'} theme={'description'}>
            {format(createdAt, 'MM/dd HH:mm')}
          </Typography>
        </Flex>
        <Typography className={clsx('mg-font-semibold')} size={'lg'}>
          ￥{price.toLocaleString()}
        </Typography>
      </Flex>
      <DeleteModal isOpen={isOpen} onChange={change} />
    </>
  )
}
