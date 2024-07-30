'use client'

import { Flex } from '@/components/layouts'
import { PaymentItemProps } from './type'
import { UserIcon } from '@/components/features/user'
import { z } from '@/libs/zod'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { formatDate } from 'date-fns'
import { PaymentTag } from './PaymentTag'
import { useCallback } from 'react'
import { Dialog, DialogHeader } from '@/components/ui'
import { useDisclosure } from '@/hooks'
import { PaymentDetailDialogContent } from './PaymentDetailDialogContent'

export const PaymentItem = ({
  me,
  payment,
  sheet,
  isShowUserInfo
}: PaymentItemProps) => {
  const isMe = me.id === payment.sheetUser.id
  const isSplitted = payment.splits.length >= 2
  const { isOpen, onChange, onOpen, onClose } = useDisclosure()

  const parseUserColor = useCallback(
    (v: string) => z.domain.userColor().parse(v),
    []
  )
  const userColor = parseUserColor(payment.sheetUser.color)
  const createdAt = new Date(payment.createdAt)

  return (
    <>
      <Flex
        className={clsx(
          isSplitted ? 'mg-w-full' : 'mg-w-[76vw] mg-max-w-[420px]',
          isMe ? 'mg-ml-auto' : 'mg-mr-0'
        )}
        gap={4}
        as={'button'}
        onClick={() => onOpen()}
      >
        <div className={clsx('mg-shrink-0 mg-size-8')}>
          {!isMe && !isSplitted && isShowUserInfo && (
            <UserIcon color={userColor} size={'sm'} />
          )}
        </div>
        <Flex direction={'column'} className={clsx('mg-flex-1')}>
          {!isMe && !isSplitted && isShowUserInfo && (
            <Typography
              size={'xs'}
              theme={'description'}
              className={clsx('mg-mb-1 mg-text-left')}
            >
              {payment.sheetUser.nickname}
            </Typography>
          )}
          <Flex
            direction={'column'}
            gap={2}
            className={clsx(
              'mg-flex-1',
              'mg-px-4 mg-py-4 mg-rounded-xl',
              'mg-bg-white'
            )}
          >
            <Flex align={'center'} justify={'between'}>
              <Typography
                size={'lg'}
                className={clsx('mg-font-semibold')}
              >
                ￥{payment.amount.toLocaleString()}
              </Typography>
              <Typography size={'xs'} theme={'description'}>
                {formatDate(createdAt, 'HH:mm')}
              </Typography>
            </Flex>
            <Flex gap={2}>
              {payment.title && <PaymentTag label={payment.title} />}
            </Flex>
            {isSplitted && (
              <Flex gap={4}>
                {payment.splits.map((split) => (
                  <Flex
                    key={`payment-items-split-${payment.createdAt}-${payment.paymentId}-${payment.sheetUser.id}`}
                    gap={2}
                  >
                    <Flex align={'center'} gap={1}>
                      <UserIcon
                        size={'xxs'}
                        color={parseUserColor(split.sheetUser.color)}
                      />
                      <Typography size={'xs'} theme={'description'}>
                        {split.sheetUser.nickname}
                      </Typography>
                    </Flex>
                    <Typography
                      className={clsx('mg-font-semibold')}
                      size={'xs'}
                    >
                      ￥{split.amount.toLocaleString()}
                    </Typography>
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Dialog isOpen={isOpen} onChange={onChange}>
        <DialogHeader onClose={onClose}>支払いの詳細</DialogHeader>
        <PaymentDetailDialogContent
          sheet={sheet}
          payment={payment}
          onClose={onClose}
        />
      </Dialog>
    </>
  )
}
