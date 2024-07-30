import { Flex } from '@/components/layouts'
import { Typography } from '@/components/ui/magi'
import { client } from '@/libs/hono'
import clsx from 'clsx'
import { cookies } from 'next/headers'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestInit = {
    headers: {
      cookie: cookies().toString()
    }
  }
  const getMe = async () => {
    const res = await client.api.me.$get({}, requestInit)
    switch (res.status) {
      case 200: {
        return await res.json()
      }
      default: {
        return null
      }
    }
  }

  const me = await getMe()

  return (
    <Flex className={clsx('mg-h-screen')} direction={'column'}>
      <Flex
        justify={'between'}
        align={'center'}
        className={clsx(
          'mg-sticky mg-top-0 mg-left-0',
          'mg-p-4',
          'mg-border-b mg-border-gray-300',
          'mg-bg-white',
          'mg-z-10'
        )}
      >
        <Typography
          as={'h2'}
          size={'lg'}
          className={clsx('mg-font-mono mg-font-semibold')}
        >
          tumi.
        </Typography>
        {me && (
          <Typography
            as={'h2'}
            size={'sm'}
            className={clsx(
              'mg-font-medium',
              'mg-border mg-rounded-xl',
              'mg-p-2'
            )}
          >
            {me.name}
          </Typography>
        )}
      </Flex>
      <main className={clsx('mg-px-4', 'mg-flex-1 mg-overflow-auto')}>
        {children}
      </main>
    </Flex>
  )
}
