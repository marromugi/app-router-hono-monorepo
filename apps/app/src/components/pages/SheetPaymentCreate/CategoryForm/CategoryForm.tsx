'use client'

import { Flex } from '@/components/layouts'
import clsx from 'clsx'
import { useState } from 'react'
import { CATEGORY_BADGE_VARIANTS, CATEGORY_BOX_VARIANTS } from './const'
import { Button, Typography } from '@magi-ui/core'
import { CategoryFormProps } from './type'
import { DefaultCategory } from '@/types/domain'
import {
  BasketballIcon,
  HouseIcon,
  PlateIcon,
  SocksIcon,
  TrainIcon
} from '@/components/icons'

export const CategoryForm = ({ onSubmit }: CategoryFormProps) => {
  const [color, setColor] = useState<DefaultCategory | null>(null)
  const colors = [
    'play',
    'eat',
    'house',
    'daily-use-items',
    'travel'
  ] as DefaultCategory[]
  const icons = {
    play: <BasketballIcon />,
    eat: <PlateIcon />,
    house: <HouseIcon />,
    'daily-use-items': <SocksIcon />,
    travel: <TrainIcon />
  } as const
  const labels = {
    play: '娯楽',
    eat: '食事',
    house: '住居',
    'daily-use-items': '日用品',
    travel: '交通費'
  } as const
  return (
    <Flex
      direction={'column'}
      justify={'between'}
      className={clsx('mg-h-full')}
    >
      <Typography
        as={'p'}
        size={'md'}
        className={clsx(
          'mg-mb-4',
          'mg-font-semibold',
          'mg-whitespace-pre-wrap'
        )}
      >
        {'カテゴリーを\n選択してください'}
      </Typography>
      <ul className={clsx('mg-grid mg-grid-cols-3 mg-gap-2')}>
        {colors.map((c, i) => (
          <Flex
            as={'li'}
            key={`color-form-color-${i}`}
            className={CATEGORY_BOX_VARIANTS({ color: c })}
            center
            onClick={() => setColor(c)}
            aria-checked={c === color}
          >
            <Flex direction={'column'} center gap={1}>
              {icons[c]}
              <Typography
                size={'xs'}
                theme={'description'}
                className={clsx('mg-font-semibold')}
              >
                {labels[c]}
              </Typography>
            </Flex>
          </Flex>
        ))}
      </ul>
      <div className={clsx('mg-w-full mg-mt-6')}>
        <Button
          isBlock={true}
          color={'gray'}
          variant={'fill'}
          disabled={!color}
          onClick={() => {
            if (color) onSubmit(color)
          }}
        >
          選択しました
        </Button>
      </div>
    </Flex>
  )
}
