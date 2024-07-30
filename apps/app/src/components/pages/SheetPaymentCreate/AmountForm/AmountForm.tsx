import { Flex } from '@/components/layouts'
import clsx from 'clsx'
import { Calculator } from './Calculator'
import { AmountFormProps } from './type'
import { Typography } from '@/components/ui/magi'

export const AmountForm = ({ onSubmit }: AmountFormProps) => {
  return (
    <Flex
      direction={'column'}
      justify={'end'}
      className={clsx(
        'mg-w-[calc(100%_-_32px)] mg-h-full mg-py-4',
        'mg-absolute',
        'mg-ease-bounce mg-transition-all'
      )}
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
        {'支払った金額を\n入力してください'}
      </Typography>
      <Calculator onSubmit={onSubmit} />
    </Flex>
  )
}
