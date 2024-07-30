import { Flex } from '@/components/layouts'
import { Typography } from '@/components/ui/magi'
import clsx from 'clsx'
import { Form } from './Form'

export const LoginPage = ({ params }: { params: { id: string } }) => {
  return (
    <Flex direction={'column'} justify={'center'} className={clsx('mg-p-4')}>
      <Typography as={'h1'} size={'xl'} className={clsx('mg-font-bold')}>
        ログイン
      </Typography>
      <Form id={params.id} />
    </Flex>
  )
}
