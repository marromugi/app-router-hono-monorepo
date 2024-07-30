'use client'

import { useForm } from '@/libs/hook-form'
import { schema } from './schema'
import { FormFieldText } from '@/components/form'
import { Button, Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { Flex } from '@/components/layouts'
import { SchemaType } from '@/types/lib'
import { PasswordFormProps } from './type'

export const PasswordForm = ({ onSubmit }: PasswordFormProps) => {
  const { control, formState, handleSubmit } = useForm({ schema })
  const handleDone = (values: SchemaType<typeof schema>) => {
    onSubmit(values.name)
  }
  return (
    <Flex direction={'column'} className={clsx('mg-flex-1')} justify={'between'}>
      <Flex direction={'column'} gap={2}>
        <Typography as={'p'} size={'md'} className={clsx('mg-mb-4', 'mg-font-semibold', 'mg-whitespace-pre-wrap')}>
          {'あいことばを入力してください'}
        </Typography>
        <FormFieldText
          control={control}
          name={'name'}
          label={''}
          showLabel={false}
          required={false}
          aria-describedby={'あいことば'}
          errors={formState.errors}
        />
      </Flex>
      <div className={clsx('mg-mt-4')}>
        <Button
          color={'gray'}
          variant={'fill'}
          disabled={!formState.isValid}
          isBlock
          onClick={handleSubmit(handleDone)}
        >
          入力しました
        </Button>
      </div>
    </Flex>
  )
}
