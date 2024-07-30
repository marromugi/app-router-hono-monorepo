import { client } from '@/libs/hono'
import { ButtonBase, Typography } from '@/components/ui/magi'
import { cookies } from 'next/headers'
import clsx from 'clsx'
import { Flex } from '@/components/layouts'
import { UserIcon } from '@/components/features/user'
import { formatDate } from 'date-fns'
import Link from 'next/link'
import { ROUTES } from '@/const/route'
import { UsersIcon } from '@heroicons/react/16/solid'
import { SheetCard } from '@/components/features/sheet'

export const DashboardPage = async () => {
  const requestInit = {
    headers: {
      cookie: cookies().toString()
    }
  }

  const getSheets = async () => {
    const res = await client.api.sheet.$get({}, requestInit)
    switch (res.status) {
      case 200: {
        return await res.json()
      }
      default: {
        return { sheets: [] }
      }
    }
  }

  const { sheets } = await getSheets()

  return (
    <>
      <Flex
        direction={'column'}
        className={clsx('mg-pt-6', 'mg-bg-white', 'mg-top-0 mg-sticky')}
      >
        <Flex justify={'between'}>
          <div>
            <Typography
              as={'h2'}
              size={'xl'}
              className={clsx('mg-font-mono mg-font-semibold')}
            >
              sheet.
            </Typography>
            <Typography
              as={'h1'}
              className={clsx('mg-font-semibold')}
              size={'xs'}
            >
              シート
            </Typography>
          </div>
          <Link href={ROUTES.sheetCreate}>
            <ButtonBase
              color={'gray'}
              size={'sm'}
              className={clsx('!mg-sr-onlymg-w-fit')}
            >
              シートをつくる
            </ButtonBase>
          </Link>
        </Flex>
        <div
          className={clsx(
            'mg-w-full mg-h-10',
            '-mg-bottom-10',
            'mg-bg-gradient-to-b',
            'mg-from-white mg-to-transparent',
            'mg-absolute'
          )}
        ></div>
      </Flex>
      <Flex
        as={'ul'}
        direction={'column'}
        className={clsx('mg-mt-6')}
        gap={4}
      >
        {sheets.map((s) => (
          <Link
            key={`dashboard-sheet-list-${s.id}`}
            href={ROUTES.sheet(s.id)}
          >
            <SheetCard sheet={s} />
          </Link>
        ))}
      </Flex>
    </>
  )
}
