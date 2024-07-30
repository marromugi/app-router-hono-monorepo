import { Flex } from '@/components/layouts'
import clsx from 'clsx'
import { FormCardProps } from './type'

export const FormCard = ({ isVisible, ...props }: FormCardProps) => {
  return (
    <Flex
      {...props}
      direction={'column'}
      className={clsx(
        'mg-w-[calc(100%_-_32px)] mg-h-[320px]',
        'mg-absolute',
        'mg-bg-white mg-p-4 mg-rounded-xl',
        'mg-ease-bounce mg-transition-all',
        isVisible ? 'mg-scale-100 mg-opacity-100 mg-delay-300' : 'mg-scale-90 mg-opacity-0 mg-pointer-events-none'
      )}
    />
  )
}
