'use client'

import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { CopyField } from './CopyField'
import { ActionButtonList } from './ActionButtonList'
import { LinkQrCode } from './LinkQrCode'
import { Flex } from '@/components/layouts'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { formatDate } from 'date-fns'

export const SheetCreateCompletePage = () => {
  const searchParams = useSearchParams()
  const expiredAt = searchParams.get('expiredAt')
  const expiredDate = new Date(expiredAt ?? '')
  const isValidExpiredDate = !Number.isNaN(expiredDate.getTime())
  const expiredAtMessage =
    expiredAt && isValidExpiredDate
      ? formatDate(expiredDate, 'yyyy/MM/dd HH:mm')
      : ''
  return (
    <Flex
      gap={4}
      direction={'column'}
      align={'center'}
      className={clsx('mg-bg-white mg-p-4 mg-rounded-xl')}
    >
      <Suspense>
        <LinkQrCode />
        <Typography
          as={'p'}
          size={'md'}
          className={clsx('mg-font-semibold')}
        >
          {'シートが作成されました！'}
        </Typography>
        <CopyField />
        <Typography
          as={'p'}
          size={'sm'}
          theme={'description'}
          className={clsx(' mg-text-center', 'mg-whitespace-pre-wrap')}
        >
          {`QRコードもしくはリンクを\nもう一人の参加者に共有して下さい\n`}
          {expiredAtMessage && (
            <Typography
              as={'p'}
              size={'sm'}
              theme={'description'}
              className={clsx(
                'mg-text-center',
                'mg-whitespace-pre-wrap'
              )}
            >
              URLは
              <span className={clsx('mg-font-semibold', 'mg-px-1')}>
                {expiredAtMessage}
              </span>
              まで有効です。
            </Typography>
          )}
        </Typography>
        <ActionButtonList />
      </Suspense>
    </Flex>
  )
}
