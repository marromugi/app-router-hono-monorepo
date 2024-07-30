'use client'

import { Flex } from '@/components/layouts'
import clsx from 'clsx'
import { useState } from 'react'
import { COLOR_BADGE_VARIANTS, COLOR_BOX_VARIANTS } from './const'
import { Button, Typography } from '@magi-ui/core'
import { ColorFormProps } from './type'
import { UserColor } from '@/types/domain'

export const ColorForm = ({ onSubmit }: ColorFormProps) => {
  const [color, setColor] = useState<UserColor | null>(null)
  const colors = ['red', 'blue', 'green', 'purple', 'yellow', 'lime'] as const
  return (
    <Flex direction={'column'} justify={'between'} className={clsx('mg-h-full')}>
      <Typography as={'p'} size={'md'} className={clsx('mg-mb-4', 'mg-font-semibold', 'mg-whitespace-pre-wrap')}>
        {'好きなカラーを\n選択してください'}
      </Typography>
      <ul className={clsx('mg-grid mg-grid-cols-3 mg-gap-2')}>
        {colors.map((c, i) => (
          <Flex
            as={'li'}
            key={`color-form-color-${i}`}
            className={COLOR_BOX_VARIANTS({ color: c })}
            center
            onClick={() => setColor(c)}
            aria-checked={c === color}
          >
            <span className={COLOR_BADGE_VARIANTS({ color: c })}></span>
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
