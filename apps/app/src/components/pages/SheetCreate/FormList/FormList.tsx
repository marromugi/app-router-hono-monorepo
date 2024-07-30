'use client'

import { Flex } from '@/components/layouts'
import { UserColor } from '@/types/domain'
import { Button, Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { useState } from 'react'
import { Stepper } from './Stepper'
import { ROUTES } from '@/const/route'
import { client } from '@/libs/hono'
import router from 'next/router'
import { COLOR_CARD_VARIANTS } from '../const'
import { ColorForm } from './ColorForm'
import { COLOR_BADGE_VARIANTS } from './ColorForm/const'
import { FormCard } from './FormCard'
import { NameForm } from './NameForm'
import { PasswordForm } from './PasswordForm'
import { FormListProps } from './type'
import { useMutation } from '@/libs/hono/hooks'
import { useNotification } from '@/hooks'
import { SchemaType } from '@/types/lib'
import { useForm } from '@/libs/hook-form'
import { schema } from './schema'
import { useWatch } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { TitleForm } from './TitleForm'
import { UserIcon } from '@heroicons/react/16/solid'

export const FormList = ({ user }: FormListProps) => {
  const [phase, setPhase] = useState(1)
  const { formState, reset, control, handleSubmit } = useForm({
    schema
  })
  const { trigger } = useMutation('/api/sheet', 'post', 200, {
    onError: async (res) => {
      const { message } = await res.json()
      notify({
        id: 'create-sheet',
        theme: 'error',
        message: 'シートを作成できませんでした',
        subMessage: message
      })
    }
  })
  const { notify } = useNotification()

  const currentFormValues = useWatch({ control })
  const router = useRouter()

  const handleCreate = async (values: SchemaType<typeof schema>) => {
    const sheet = await trigger({
      json: {
        ...values,
        userId: user.id
      }
    })
    // notify({
    //   id: 'create-sheet',
    //   theme: 'success',
    //   message: 'シートを作成しました',
    //   subMessage: JSON.stringify(sheet)
    // })
    router.push(
      ROUTES.sheetCreateComplete({
        code: sheet.code,
        id: sheet.id,
        expiredAt: sheet.code_expired_at
      })
    )
  }

  return (
    <>
      <Flex
        as={'section'}
        direction={'column'}
        gap={4}
        center
        className={clsx('mg-p-4', 'mg-bg-white mg-rounded-xl')}
      >
        <Typography
          as={'h1'}
          size={'md'}
          className={clsx('mg-font-semibold')}
        >
          新規でシートを作成する
        </Typography>
        <Flex gap={4} center>
          <Stepper count={1} isActive={phase === 1} />
          <Stepper count={2} isActive={phase === 2} />
          <Stepper count={3} isActive={phase === 3} />
          <Stepper count={4} isActive={phase === 4} />
        </Flex>
      </Flex>
      <Flex
        className={clsx(
          'mg-size-full mg-p-4 mg-fixed',
          'mg-top-0 mg-left-0'
        )}
        center
      >
        <FormCard isVisible={phase === 1}>
          <TitleForm
            onSubmit={(title) => {
              reset(
                { ...currentFormValues, title },
                { keepDefaultValues: true }
              )
              setPhase(2)
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 2}>
          <NameForm
            defaultValues={{ name: user.name }}
            onSubmit={(name) => {
              reset(
                { ...currentFormValues, name },
                { keepDefaultValues: true }
              )
              setPhase(3)
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 3}>
          <ColorForm
            onSubmit={(color) => {
              reset(
                { ...currentFormValues, color },
                { keepDefaultValues: true }
              )
              setPhase(4)
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 4}>
          <Flex
            direction={'column'}
            justify={'between'}
            align={'center'}
            className={clsx('mg-size-full')}
          >
            <Flex
              center
              direction={'column'}
              gap={4}
              className={clsx(
                'mg-w-full mg-p-6 mg-rounded-xl',
                COLOR_CARD_VARIANTS({
                  color: currentFormValues.color ?? 'gray'
                })
              )}
            >
              <span
                className={clsx(
                  'mg-block mg-size-10 mg-rounded-full',
                  COLOR_BADGE_VARIANTS({
                    color: currentFormValues.color ?? 'red'
                  })
                )}
              ></span>
              <Typography
                size={'md'}
                className={clsx('mg-font-semibold')}
              >
                {currentFormValues.title}
              </Typography>
              <Flex
                gap={1}
                className={clsx(
                  'mg-border mg-border-gray-900 mg-bg-white',
                  'mg-rounded-full mg-py-2 mg-px-4'
                )}
              >
                <UserIcon className={clsx('mg-size-5')} />
                <Typography
                  size={'sm'}
                  className={clsx('mg-font-semibold')}
                >
                  {currentFormValues.name}
                </Typography>
              </Flex>
            </Flex>
            <Flex direction={'column'} center>
              <Typography
                className={clsx('mg-font-semibold', 'mg-mb-4 mg-mt-6')}
              >
                こちらで作成します。よろしいですか？
              </Typography>
              <Flex gap={4}>
                <Button
                  color={'gray'}
                  variant={'outline'}
                  onClick={() => {
                    setPhase(1)
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  color={'gray'}
                  variant={'fill'}
                  disabled={!formState.isValid}
                  isLoading={formState.isLoading}
                  onClick={handleSubmit(handleCreate)}
                >
                  OK!
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </FormCard>
      </Flex>
    </>
  )
}
