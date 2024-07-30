'use client'

import { Flex } from '@/components/layouts'
import { ROUTES } from '@/const/route'
import { PlusIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { CreateButtonProps } from './type'

export const CreateButton = ({ id }: CreateButtonProps) => {
  const router = useRouter()
  return (
    <Flex
      as={'button'}
      center
      className={clsx('mg-size-12 mg-rounded-full', 'mg-bg-white', 'mg-shadow-1')}
      onClick={() => router.push(ROUTES.sheetPaymentCraete(id))}
    >
      <PlusIcon className={clsx('mg-size-5')} />
    </Flex>
  )
}
