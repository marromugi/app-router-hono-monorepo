'use client'

import { useForm } from '@/libs/hook-form'
import { schema } from './schema'
import { FormFieldText } from '@/components/form'
import { Button } from '@magi-ui/core'

export const Form = () => {
  const { control, formState } = useForm({
    schema,
    defaultValues: {
      keyword: ''
    }
  })
  return (
    <>
      <FormFieldText
        control={control}
        name={'keyword'}
        label={'あいことば'}
        showLabel={false}
        required={false}
        aria-describedby={'あいことば'}
        errors={formState.errors}
      />
      <Button color={'orange'} variant={'fill'} disabled={!formState.isValid} isBlock>
        登録する
      </Button>
    </>
  )
}
