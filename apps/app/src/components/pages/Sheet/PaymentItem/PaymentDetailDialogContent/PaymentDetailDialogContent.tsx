import { Flex } from '@/components/layouts'
import { safeParse, z } from '@/libs/zod'

import { Button, Typography } from '@magi-ui/core'

import clsx from 'clsx'

import { PaymentDetailDialogContentProps } from './type'
import { UserIcon } from '@/components/features/user'
import { PaymentTag } from '../PaymentTag'
import { formatDate } from 'date-fns'
import { useMutation } from '@/libs/hono/hooks'
import { useNotification } from '@/hooks'
import { DialogContent } from '@/components/ui'
import { useFormState } from 'react-dom'
import { revalidateSheet } from '@/libs/next/cache'

export const PaymentDetailDialogContent = ({
  sheet,
  payment,
  onClose
}: PaymentDetailDialogContentProps) => {
  const userColor = safeParse(
    z.domain.userColor(),
    payment.sheetUser.color,
    undefined
  )
  const [_, dispatch] = useFormState(revalidateSheet, false)
  const { notify } = useNotification()
  const { trigger, isMutating } = useMutation(
    '/api/sheet/:id/payment/:paymentId',
    'delete',
    200,
    {
      onError: async (err) => {
        switch (err.status) {
          case 500: {
            const { message, subMessage } = await err.json()
            notify({
              message,
              subMessage,
              theme: 'error'
            })
          }
        }
      }
    }
  )

  const items = [
    {
      label: '作成者',
      value: (
        <Flex align={'center'} gap={1}>
          <UserIcon size={'xs'} color={userColor} />
          <Typography size={'xs'}>
            {payment.sheetUser.nickname}
          </Typography>
        </Flex>
      )
    },
    {
      label: 'タグ',
      value: (
        <Flex gap={2} wrap>
          <PaymentTag label={payment.title} />
        </Flex>
      )
    },
    {
      label: '作成日',
      value: (
        <Typography size={'xs'} theme={'description'}>
          {formatDate(payment.createdAt, 'yyyy/MM/dd HH:mm')}
        </Typography>
      )
    }
  ]

  const handleDelete = async () => {
    await trigger({
      param: {
        id: sheet.id,
        paymentId: payment.paymentId
      }
    })
    notify({
      theme: 'success',
      id: 'payment-detail-dialog-delete-success',
      message: '支払いを削除しました'
    })

    dispatch()
    onClose()
  }

  return (
    <DialogContent color={'white'} className={clsx('mg-py-4')}>
      <Typography
        as={'span'}
        size={'2xl'}
        className={clsx('mg-font-bold')}
      >
        ￥{payment.amount.toLocaleString()}
      </Typography>
      <Flex direction={'column'} gap={4} className={clsx('mg-mt-6')}>
        {items.map((i) => (
          <Flex
            gap={2}
            align={'center'}
            key={`payment-detail-dialog-info-${i.label}`}
          >
            <Typography
              className={clsx('mg-w-[60px]')}
              size={'xs'}
              theme={'description'}
            >
              {i.label}
            </Typography>
            {i.value}
          </Flex>
        ))}
      </Flex>
      {payment.splits.length > 0 && (
        <div className={clsx('mg-mt-10')}>
          <Typography size={'md'} className={clsx('mg-font-bold')}>
            割り勘
          </Typography>
          <table className={clsx('mg-w-full', 'mg-mt-4')}>
            <thead>
              <tr
                className={clsx(
                  'mg-text-xs mg-text-gray-500',
                  'mg-border-b-100 mg-border-b mg-rounded-xl',
                  'mg-mb-2 mg-font-medium',
                  '[&>th]:mg-font-medium [&>th]:mg-size-xs',
                  '[&>th]:mg-text-gray-600'
                )}
              >
                <th className={clsx('mg-text-left')}>支払った人</th>
                <th>割合</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {payment.splits.map((s) => (
                <tr
                  key={`payment-detail-dialog-content-split-${s.sheetUser.id}`}
                  className={clsx('mg-text-sm', '[&>td]:mg-py-1')}
                >
                  <td
                    colSpan={4}
                    className={clsx('mg-flex mg-items-center mg-gap-2')}
                  >
                    <UserIcon
                      color={safeParse(
                        z.domain.userColor(),
                        s.sheetUser.color,
                        undefined
                      )}
                      size={'xxs'}
                    />
                    <Typography size={'xs'}>
                      {s.sheetUser.nickname}
                    </Typography>
                  </td>
                  <td className={clsx('mg-text-center')}>
                    {s.percentage}%
                  </td>
                  <td className={clsx('mg-text-center')}>
                    ￥{s.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Flex className={clsx('mg-mt-10')} justify={'end'} gap={2}>
        <Button
          size={'sm'}
          color={'gray'}
          variant={'fill'}
          disabled={isMutating}
        >
          編集する
        </Button>
        <Button
          size={'sm'}
          color={'red'}
          variant={'fill'}
          isLoading={isMutating}
          disabled={isMutating}
          onClick={handleDelete}
        >
          削除する
        </Button>
      </Flex>
    </DialogContent>
  )
}
