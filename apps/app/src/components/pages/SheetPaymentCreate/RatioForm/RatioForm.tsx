'use client'

import { UserIcon } from '@/components/features/user'
import { Flex } from '@/components/layouts'
import { Button, Typography } from '@magi-ui/core'
import { RadioFormProps } from './type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { RatioSeekBar } from './RatioSeekbar'
import { useFormatAmountRatio } from './hooks'

export const RatioForm = ({
  users,
  totalAmounts,
  onSubmit
}: RadioFormProps) => {
  const [ratio, setRatio] = useState(50)

  const { ratioAmounts } = useFormatAmountRatio({
    totalAmounts,
    ratio,
    users
  })

  const handleChange = (value: number) => {
    setRatio(value)
    return
  }

  const handleSubmit = () => {
    const values = Array.from(ratioAmounts.entries()).map((v) => ({
      userId: v[0],
      amount: v[1].amount,
      percentage: v[1].percentage
    }))
    console.log(values)
    onSubmit(values)
  }

  useEffect(() => {
    setRatio(50)
  }, [users])

  return (
    <>
      <Flex direction={'column'} gap={2}>
        {users.map((u) => (
          <Flex
            key={`radio-form-user-${u.id}`}
            align={'center'}
            gap={2}
          >
            <UserIcon color={u.color} size={'sm'} />
            <Typography
              size={'sm'}
              className={clsx('mg-font-semibold')}
            >
              {u.nickname} が
            </Typography>
            <Typography
              as={'span'}
              size={'lg'}
              className={clsx(
                'mg-font-semibold',
                'mg-animate-fade-in-from-b'
              )}
            >
              ￥{(ratioAmounts.get(u.id)?.amount ?? 0).toLocaleString()}
            </Typography>
          </Flex>
        ))}
      </Flex>
      <RatioSeekBar value={ratio} onChange={handleChange} />
      <Button color={'gray'} isBlock onClick={handleSubmit}>
        OK!
      </Button>
    </>
  )
}
