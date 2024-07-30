'use client'

import { Flex } from '@/components/layouts'
import { ToastProps } from './type'
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { Typography } from '@/components/ui/magi'
import {
  TOAST_ICON_CONTAINER_VARIANTS,
  TOAST_ICON_VARIANTS,
  TOAST_VARIANTS
} from './const'

export const Toast = ({
  theme = 'success',
  message,
  subMessage,
  isVisible = true,
  onClose = () => {}
}: ToastProps) => {
  const getIcon = () => {
    switch (theme) {
      case 'success': {
        return CheckIcon
      }
      case 'error': {
        return ExclamationTriangleIcon
      }
      case 'warning': {
        return ExclamationCircleIcon
      }
    }
  }
  const Icon = getIcon()

  return (
    <Flex
      gap={4}
      align={'start'}
      className={TOAST_VARIANTS({ theme, isVisible })}
    >
      <Flex center className={TOAST_ICON_CONTAINER_VARIANTS({ theme })}>
        <Icon className={TOAST_ICON_VARIANTS({ theme })} />
      </Flex>
      <Flex direction={'column'} className={clsx('mg-flex-1')}>
        <Typography
          className={clsx('mg-font-semibold', '!mg-leading-10')}
          size={'sm'}
        >
          {message}
        </Typography>
        {subMessage && (
          <Typography theme={'description'} size={'xs'}>
            {subMessage}
          </Typography>
        )}
      </Flex>
      <Flex
        center
        as={'button'}
        type={'button'}
        onClick={onClose}
        className={clsx('mg-size-10')}
      >
        <XMarkIcon className={clsx('mg-text-gray-600', 'mg-size-5')} />
      </Flex>
    </Flex>
  )
}
