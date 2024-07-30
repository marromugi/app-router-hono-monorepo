'use client'

import { SheetCard } from '@/components/features/sheet'
import { Flex } from '@/components/layouts'
import { Button, Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { IntroductionProps } from './type'

export const Introduction = ({
  sheet,
  isLoggedIn
}: IntroductionProps) => {
  return (
    <>
      <ul className={clsx('mg-mt-6')}>
        <SheetCard sheet={sheet} />
      </ul>
      <Typography
        as={'h1'}
        size={'xl'}
        className={clsx('mg-font-bold', 'mg-mt-16')}
      >
        シートに招待されました！
      </Typography>
      <Typography
        as={'p'}
        theme={'description'}
        className={clsx('mg-font-bold', 'mg-mt-2')}
      >
        {isLoggedIn
          ? 'シートに参加する場合、下のボタンから登録を進めてください。'
          : 'シートに参加する前に、下のボタンからサインアップをしてください。'}
      </Typography>
    </>
  )
}
