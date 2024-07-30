import { Typography } from '@magi-ui/core'
import { usePaymentTotalCalculator } from '../hooks'
import { PaymentCalculatedMessageProps } from './type'
import clsx from 'clsx'
import { Flex } from '@/components/layouts'
import { CurrencyYenIcon } from '@heroicons/react/24/outline'
import { Toast } from '@/components/ui'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export const PaymentCalculatedMessage = ({
  sheet,
  me
}: PaymentCalculatedMessageProps) => {
  const { calculateTotal } = usePaymentTotalCalculator()
  const calculatedResult = calculateTotal(
    sheet.payments,
    sheet.sheetUsers,
    me
  )

  if (!calculatedResult) {
    return (
      <Typography
        size={'md'}
        theme={'description'}
        className={clsx('mg-font-semibold')}
      >
        支払いはありません
      </Typography>
    )
  }

  if (!calculatedResult.to) {
    return (
      <Typography
        size={'sm'}
        theme={'description'}
        className={clsx('mg-font-semibold')}
      >
        支払った合計は
        <Typography
          size={'md'}
          className={clsx('mg-font-semibold')}
          as={'span'}
        >
          ￥{calculatedResult.amount}
        </Typography>
        です
      </Typography>
    )
  }

  return (
    <>
      {/* <Toast
        message={`￥${calculatedResult.amount}支払いが必要です`}
        theme={'warning'}
        isVisible
      /> */}
      <Flex
        className={clsx(
          'mg-px-2 mg-py-2 mg-rounded-xl mg-bg-gray-50',
          'mg-font-semibold'
        )}
        align={'center'}
        gap={2}
      >
        <div className={clsx('mg-bg-white mg-rounded-full mg-p-2')}>
          <ExclamationCircleIcon
            className={clsx('mg-size-6 mg-fill-yellow-400')}
          />
        </div>
        <Typography
          size={'xs'}
          className={clsx('mg-font-semibold')}
          theme={'description'}
        >
          ￥{calculatedResult.amount} 支払いが必要です
        </Typography>
      </Flex>
    </>
  )
}
