'use client'

import clsx from 'clsx'
import { UserCard } from './UserCard'
import { useState } from 'react'
import { Button, Typography } from '@magi-ui/core'
import { Flex } from '@/components/layouts'
import { UserFormProps } from './type'

export const UserForm = ({ onSelect }: UserFormProps) => {
  const [user, setUser] = useState('')
  return (
    <Flex direction={'column'} center className={clsx('mg-size-full')}>
      <Typography className={clsx('mg-font-semibold', 'mg-text-center mg-mb-8')}>支払う人を選択してください</Typography>
      <div className={clsx('mg-w-full mg-grid mg-grid-cols-2 mg-gap-4')}>
        <UserCard name={'marron'} color={'red'} isSelected={user === 'marron'} onClick={() => onSelect('marron')} />
        <UserCard name={'mugi'} color={'blue'} isSelected={user === 'mugi'} onClick={() => onSelect('mugi')} />
      </div>
    </Flex>
  )
}
