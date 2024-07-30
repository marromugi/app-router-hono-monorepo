'use client'

import { Flex } from '@/components/layouts'
import { DefaultCategory } from '@/types/domain'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { useState } from 'react'
import { Stepper } from '../../SheetCreate/FormList/Stepper'
import { AmountForm } from '../AmountForm'
import { CategoryForm } from '../CategoryForm'
import { FormCard } from '../FormCard'
import { RatioForm } from '../RatioForm'
import { FormListProps, SheetPaymentCreateFormValues } from './type'
import { useMutation } from '@/libs/hono/hooks'
import { useNotification } from '@/hooks'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/const/route'
import { revalidateSheet } from '@/libs/next/cache'
import { useFormState } from 'react-dom'

export const FormList = ({ id, users, me }: FormListProps) => {
  const router = useRouter()
  const [phase, setPhase] = useState(1)
  const [values, setValues] = useState<SheetPaymentCreateFormValues>({
    name: '',
    amount: 0,
    category: 'play',
    ratio: []
  })
  const [_, dispatch] = useFormState(revalidateSheet, false)
  const { notify } = useNotification()
  const { trigger } = useMutation(
    '/api/sheet/:id/payment',
    'post',
    200,
    {
      onError: (err) => {
        switch (err.status) {
          case 500: {
            notify({
              theme: 'error',
              id: 'sheet-payment-create',
              message: '予期せぬエラーが発生しました。',
              subMessage: '時間をおいて再度お試しください。'
            })
          }
        }
      }
    }
  )

  const handleSubmit = async (values: SheetPaymentCreateFormValues) => {
    /**0以上の支払い分割のみ適用 */
    const splitting = values.ratio.filter((r) => r.amount > 0)
    const isSubmitSplitting = splitting.length >= 2

    await trigger({
      json: {
        category: values.category,
        amount: values.amount,
        userId: me.id,
        splitting: isSubmitSplitting ? splitting : []
      },
      param: {
        id
      }
    })
    dispatch()
    router.push(ROUTES.sheet(id))
  }

  return (
    <>
      <Flex
        as={'section'}
        direction={'row'}
        justify={'between'}
        gap={4}
        center
        className={clsx('mg-p-4', 'mg-bg-white mg-rounded-xl')}
      >
        <Typography
          as={'h1'}
          size={'sm'}
          className={clsx('mg-font-semibold')}
        >
          支払いを追加する
        </Typography>
        <Flex gap={2} center>
          <Stepper count={1} isActive={phase === 1} />
          <Stepper count={2} isActive={phase === 2} />
          <Stepper count={3} isActive={phase === 3} />
        </Flex>
      </Flex>
      <Flex
        className={clsx(
          'mg-size-full mg-p-4 mg-fixed',
          'mg-top-0 mg-left-0'
        )}
        center
      >
        <FormCard isVisible={phase === 3}>
          <RatioForm
            users={users}
            totalAmounts={values.amount}
            onSubmit={(ratio) => {
              setValues((prev) => ({ ...prev, ratio }))
              handleSubmit({ ...values, ratio })
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 2}>
          <AmountForm
            onSubmit={(amount) => {
              setValues({ ...values, amount })
              setPhase(3)
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 1}>
          {/* <TitleForm
            onSubmit={(title) => {
              setValues({ ...values, title })
              setPhase(2)
            }}
          /> */}
          <CategoryForm
            onSubmit={(category) => {
              setValues({ ...values, category })
              setPhase(2)
            }}
          />
        </FormCard>
        {/* <AmountForm
          isVisible={phase === 3}
          onChangeUser={() => setPhase(2)}
          onSubmit={async (amount) => {
            console.log(id)
            if (!id) return
            await client.api.sheet[':id'].payment.$post({
              param: { id },
              json: {
                amount,
                title: values.title
              }
            })
            router.push(ROUTES.sheet(id))
          }}
        /> */}
      </Flex>
    </>
  )
}
