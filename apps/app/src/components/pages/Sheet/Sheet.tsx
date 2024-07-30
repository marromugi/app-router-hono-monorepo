import { Flex } from '@/components/layouts'
import { client } from '@/libs/hono'
import { Typography } from '@/components/ui/magi'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/const/route'
import clsx from 'clsx'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { PaymentItem } from './PaymentItem'
import { SheetResponse } from './type'
import { isSameDatePayment } from './util'
import { formatDate } from 'date-fns'
import { PaymentCalculatedMessage } from './PaymentCalculatedMessage'
import { REVALIDATE_TAGS } from '@/const/revalidate'

export const SheetPage = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const requestInit = {
    headers: {
      cookie: cookies().toString()
    }
  }
  const getSheet = async () => {
    const res = await client.api.sheet[':id'].$get(
      {
        param: { id }
      },
      {
        ...requestInit,
        init: {
          next: {
            tags: [REVALIDATE_TAGS.sheet]
          }
        }
      }
    )

    if (res.status === 200) {
      return await res.json()
    }

    return null
  }
  const getMe = async () => {
    const res = await client.api.sheet[':id'].me.$get(
      {
        param: { id }
      },
      requestInit
    )

    if (res.status === 200) {
      return await res.json()
    }

    return null
  }

  const me = await getMe()
  const sheet = await getSheet()

  if (!sheet || !me) {
    redirect(ROUTES.dashboard)
  }

  const paymentsByDate = sheet.payments
    .reduce((prev: SheetResponse['payments'][], next) => {
      if (prev.length === 0) {
        return [[next]]
      }

      const currentDatePayments = prev[prev.length - 1]
      const currentPayment =
        currentDatePayments[currentDatePayments.length - 1]

      if (isSameDatePayment(currentPayment, next)) {
        currentDatePayments.push(next)
        prev.pop()
        prev.push(currentDatePayments)
        return prev
      }

      prev.push([next])
      return prev
    }, [])
    .filter((p) => p.length > 0)

  return (
    <Flex direction={'column'} className={clsx('mg-h-dvh')}>
      <Flex
        justify={'between'}
        align={'center'}
        className={clsx(
          'mg-h-16 mg-px-4',
          'mg-border-b mg-border-gray-100'
        )}
      >
        <Flex gap={4} align={'center'}>
          <Link href={ROUTES.dashboard}>
            <Flex className={clsx('mg-size-5')}>
              <ChevronLeftIcon
                className={clsx('mg-size-5', 'mg-fill-gray-300')}
              />
            </Flex>
          </Link>
          <Typography
            as={'h1'}
            size={'md'}
            className={clsx('mg-font-semibold')}
          >
            {sheet.title}
          </Typography>
        </Flex>
        <Flex>
          <Flex as={'button'} center className={clsx('mg-size-5')}>
            <TrashIcon className={clsx('mg-size5-5')} />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={'column'}
        className={clsx(
          'mg-flex-1',
          'mg-overflow-auto',
          'mg-bg-gray-50'
        )}
      >
        <Flex
          direction={'column'}
          gap={1}
          className={clsx('mg-overflow-auto mg-flex-1', 'mg-px-4')}
        >
          {paymentsByDate.map((payments, i) => (
            <>
              <div
                className={clsx('mg-mt-8')}
                key={`payments-by-date-${i}`}
              >
                <Flex align={'center'} gap={2}>
                  <div
                    className={clsx(
                      'mg-flex-1 mg-bg-gray-100 mg-h-[2px]'
                    )}
                  ></div>
                  <Typography size={'xs'} theme={'description'}>
                    {formatDate(
                      new Date(payments[0].createdAt),
                      'yyyy-MM-dd'
                    )}
                  </Typography>
                  <div
                    className={clsx(
                      'mg-flex-1 mg-bg-gray-100 mg-h-[2px]'
                    )}
                  ></div>
                </Flex>
              </div>
              {payments.map((p, i) => (
                <div
                  key={`sheet-payment-${p.paymentId}`}
                  className={clsx('mg-mt-4', 'last:mg-pb-10')}
                >
                  <PaymentItem
                    sheet={sheet}
                    payment={p}
                    me={me}
                    /**直前の支払いを同じユーザーの場合はユーザー情報を表示しない */
                    isShowUserInfo={
                      i === 0 ||
                      payments[i - 1].sheetUser.id !== p.sheetUser.id
                    }
                  />
                </div>
              ))}
            </>
          ))}
        </Flex>
        <Flex
          align={'center'}
          gap={2}
          className={clsx(
            'mg-p-4 mg-shrink-0',
            'mg-shadow-1 mg-bg-white'
          )}
        >
          <div className={clsx('mg-flex-1')}>
            <PaymentCalculatedMessage sheet={sheet} me={me} />
          </div>
          <Link href={ROUTES.sheetPaymentCreate(id)}>
            <Flex
              center
              className={clsx(
                'mg-p-3',
                'mg-rounded-full mg-bg-gray-50'
              )}
            >
              <PlusIcon className={clsx('mg-size-5')} />
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
