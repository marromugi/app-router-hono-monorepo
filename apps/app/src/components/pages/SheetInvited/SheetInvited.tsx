'use client'

import { Flex } from '@/components/layouts'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { Form } from './Form'

export const SheetInvitedPage = () => {
  return (
    <>
      <Flex
        as={'section'}
        direction={'column'}
        gap={4}
        center
        className={clsx('mg-w-full mg-p-4', 'mg-bg-white mg-rounded-xl')}
      >
        <Typography as={'h1'} size={'md'} className={clsx('mg-font-semibold')}>
          xxさんにシートに招待されました！
        </Typography>
      </Flex>
      <div className={clsx('mg-bg-white mg-p-4 mg-rounded-xl')}>
        <Typography as={'p'} size={'md'} className={clsx('mg-font-semibold', 'mg-whitespace-pre-wrap')}>
          {'あいことばを入力してください'}
        </Typography>
        <Form />
      </div>
    </>
  )
}
