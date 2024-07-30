'use client'

import { Flex } from '@/components/layouts'
import { ROUTES } from '@/const/route'
import { Button, Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

export const ActionButtonList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  return (
    <Flex center gap={4} direction={'column'} className={clsx('mg-w-full')}>
      <Button isBlock color={'orange'} onClick={() => router.push(ROUTES.sheet(id ?? ''))}>
        共有しました
      </Button>
      <Typography as={'p'} size={'sm'} theme={'description'} className={clsx('mg-underline')}>
        シェアする
      </Typography>
    </Flex>
  )
}
