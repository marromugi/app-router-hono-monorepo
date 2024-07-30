import { Flex } from '@/components/layouts'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { StepperProps } from './type'

export const Stepper = ({ count, isActive }: StepperProps) => {
  return (
    <Flex
      center
      className={clsx(
        'mg-size-8 mg-rounded-full mg-transition-all',
        isActive ? 'mg-bg-gray-900 mg-scale-105' : 'mg-bg-gray-50 mg-scale-100'
      )}
    >
      <Typography theme={isActive ? 'fill' : 'disabled'} className={clsx('mg-font-semibold mg-transition-all')}>
        {count}
      </Typography>
    </Flex>
  )
}
