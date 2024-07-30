import { Flex } from '@/components/layouts'

import clsx from 'clsx'
import { Form } from './Form'
import { Typography } from '@/components/ui/magi'

export const SignupPage = ({
  searchParams: { redirect }
}: {
  searchParams: { redirect: string }
}) => {
  return (
    <Flex
      direction={'column'}
      justify={'center'}
      className={clsx('mg-p-4')}
    >
      <Typography
        as={'h1'}
        size={'xl'}
        className={clsx('mg-font-bold')}
      >
        サインアップ
      </Typography>
      <Form redirect={redirect} />
    </Flex>
  )
}
