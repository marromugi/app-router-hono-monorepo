'use client'

import { Flex } from '@/components/layouts'
import { ChevronDoubleLeftIcon } from '@heroicons/react/16/solid'
import { Button, Typography, parseNumber } from '@magi-ui/core'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { CalculatorProps } from './type'
import { ReactNode, useState } from 'react'

export const Calculator = ({ onSubmit }: CalculatorProps) => {
  const [amount, setAmount] = useState('0')

  const handleChange = (num: ReactNode) => {
    if (typeof num !== 'string') {
      setAmount(
        amount.length <= 1 ? '0' : amount.slice(0, amount.length - 1)
      )
    } else {
      setAmount(`${amount}${num}`)
    }
  }
  return (
    <>
      <Flex
        direction={'column'}
        align={'end'}
        className={clsx(
          'mg-border-4 mg-border-gray-800 mg-bg-gray-900',
          'mg-p-4 mg-rounded-xl',
          'mg-my-4'
        )}
      >
        <Typography
          theme={'fill'}
          size={'xl'}
          className={clsx('mg-font-semibold mg-font-mono')}
        >
          ￥{Number(amount).toLocaleString()}
        </Typography>
      </Flex>
      <div className={clsx('mg-grid mg-grid-cols-3', 'mg-gap-2')}>
        {[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '00',
          '0',
          <ChevronDoubleLeftIcon
            key={'calculator-remove'}
            className={clsx('mg-size-5 mg-text-gray-900')}
          />
        ].map((v) => (
          <button
            className={clsx(
              'mg-flex',
              'mg-justify-center mg-items-center',
              'mg-rounded-xl mg-bg-white mg-p-4',
              'mg-font-bold mg-font-mono mg-text-lg',
              'mg-transition-all',
              'active:mg-bg-gray-50 active:mg-scale-90'
            )}
            key={`calculator-${v}`}
            onClick={() => handleChange(v)}
          >
            {v}
          </button>
        ))}
      </div>
      <div className={clsx('mg-mt-4')}>
        <Button
          color={'gray'}
          isBlock
          onClick={() => onSubmit(parseNumber(amount, 0))}
        >
          記録する
        </Button>
      </div>
    </>
  )
}
