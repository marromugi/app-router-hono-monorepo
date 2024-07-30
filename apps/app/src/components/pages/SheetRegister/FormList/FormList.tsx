'use client'

import { Flex } from '@/components/layouts'
import { ROUTES } from '@/const/route'
import { useNotification } from '@/hooks'
import { useMutation } from '@/libs/hono/hooks'
import { SchemaType } from '@/types/lib'
import { Button, Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { Stepper } from '../../SheetCreate/FormList/Stepper'
import { FormCard } from '../FormCard'
import { schema } from './schema'
import { FormListProps } from './type'
import { Introduction } from '../Introduction'
import { NameForm } from './NameForm'
import { ColorForm } from './ColorForm'
import { UserIcon } from '@heroicons/react/16/solid'
import { COLOR_CARD_VARIANTS } from './const'
import { COLOR_BADGE_VARIANTS } from './ColorForm/const'
import { useForm } from '@/libs/hook-form'

export const FormList = ({
  sheet,
  me,
  code,
  isLoggedIn
}: FormListProps) => {
  const [phase, setPhase] = useState(0)
  const { formState, reset, control, handleSubmit } = useForm({
    schema
  })
  const { trigger } = useMutation(
    '/api/sheet/:id/register',
    'post',
    200,
    {
      onError: async (res) => {
        if (res.status === 400) {
          const data = await res.json()

          switch (data.type) {
            case 'invalid-code': {
              notify({
                id: 'register-sheet',
                theme: 'error',
                ...data
              })
              return
            }
            case 'already-registered': {
              notify({
                id: 'register-sheet',
                theme: 'error',
                ...data
              })
              router.replace(ROUTES.dashboard)
              return
            }
            case 'max-members': {
              notify({
                id: 'register-sheet',
                theme: 'error',
                ...data
              })
              router.replace(ROUTES.dashboard)
              return
            }
          }
        }
        notify({
          id: 'create-sheet',
          theme: 'error',
          message: 'シートに参加できませんでした',
          subMessage: '招待リンクをお試しの上、再度お試しください。'
        })
      }
    }
  )
  const { notify } = useNotification()

  const currentFormValues = useWatch({ control })
  const router = useRouter()
  const sheetUser = useMemo(
    () => sheet.sheetUsers.find((u) => !!u.color),
    [sheet]
  )

  const handleRegister = async (values: SchemaType<typeof schema>) => {
    await trigger({
      json: {
        ...values,
        code,
        userId: me?.id ?? ''
      },
      param: {
        id: sheet.id
      }
    })
    notify({
      id: 'register-sheet',
      theme: 'success',
      message: 'シートに参加しました！',
      subMessage: JSON.stringify(sheet)
    })
    router.push(ROUTES.dashboard)
  }

  return (
    <>
      <Flex
        as={'section'}
        direction={'row'}
        align={'center'}
        justify={'between'}
        className={clsx('mg-mt-6')}
      >
        <Typography
          as={'h1'}
          size={'md'}
          className={clsx('mg-font-semibold')}
        >
          シートに参加する
        </Typography>
        <Flex
          gap={2}
          center
          className={clsx(
            phase > 0 ? 'mg-animate-fade-in' : 'mg-opacity-0'
          )}
        >
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
        <div
          className={clsx(
            'mg-ease-bounce mg-transition-all',
            phase === 0
              ? 'mg-scale-100 mg-opacity-100 mg-delay-300'
              : 'mg-scale-90 mg-opacity-0 mg-pointer-events-none'
          )}
        >
          <Introduction sheet={sheet} isLoggedIn={isLoggedIn} />
          <Button
            color={'gray'}
            className={clsx('mg-mt-8')}
            isBlock
            onClick={() => setPhase(1)}
          >
            登録する
          </Button>
        </div>
        <FormCard isVisible={phase === 1}>
          <NameForm
            defaultValues={{ name: me?.name ?? '' }}
            onSubmit={(name) => {
              reset(
                { ...currentFormValues, name },
                { keepDefaultValues: true }
              )
              setPhase(2)
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 2}>
          <ColorForm
            omittedColor={sheetUser?.color}
            onSubmit={(color) => {
              reset(
                { ...currentFormValues, color },
                { keepDefaultValues: true }
              )
              setPhase(3)
            }}
          />
        </FormCard>
        <FormCard isVisible={phase === 3}>
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
                {sheet.title}
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
                  onClick={handleSubmit(handleRegister)}
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
