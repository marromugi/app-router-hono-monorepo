'use client'

import { Flex } from '@/components/layouts'
import { useForm } from '@/libs/hook-form'
import { schema } from './schema'
import { FormFieldText } from '@/components/form'
import { Button, Typography } from '@magi-ui/core'
import { useMutation } from '@/libs/hono/hooks'
import clsx from 'clsx'
import { useState } from 'react'
import { SchemaType } from '@/types/lib'
import { FormProps } from './type'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/const/route'

export const Form = ({ redirect }: FormProps) => {
  const { control, formState, handleSubmit } = useForm({ schema })
  const router = useRouter()
  const [error, setError] = useState('')
  const { trigger } = useMutation('/api/signup', 'post', 200, {
    onError: async (err) => {
      const data = await err.json()
      setError(data.message)
    }
  })

  const handleSignup = async (values: SchemaType<typeof schema>) => {
    await trigger({
      json: { ...values }
    })

    if (redirect) {
      router.push(redirect)
    } else {
      router.push(ROUTES.dashboard)
    }
  }

  return (
    <Flex direction={'column'} gap={4}>
      <div className={clsx('mg-h-10')}>
        {error && (
          <Typography
            theme={'alert'}
            className={clsx('mg-animate-fade-in')}
          >
            {error}
          </Typography>
        )}
      </div>
      <FormFieldText
        control={control}
        name={'id'}
        label={'ユーザーID'}
        errors={formState.errors}
        required
        aria-describedby="ユーザーのidを入力してください"
      />
      <FormFieldText
        control={control}
        name={'name'}
        label={'ユーザー名'}
        errors={formState.errors}
        required
        aria-describedby="ユーザー名を入力してください"
      />
      <FormFieldText
        control={control}
        name={'password'}
        label={'パスワード'}
        errors={formState.errors}
        required
        aria-describedby="シートのパスワードを入力してください"
      />
      <Button
        color={'gray'}
        disabled={!formState.isValid}
        onClick={handleSubmit(handleSignup)}
      >
        登録
      </Button>
    </Flex>
  )
}
