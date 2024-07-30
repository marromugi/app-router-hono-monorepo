import { Flex } from '@/components/layouts'
import { UsersIcon } from '@heroicons/react/16/solid'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { formatDate } from 'date-fns'
import { UserIcon } from '../../user'
import { SheetCardProps } from './type'

export const SheetCard = ({ sheet }: SheetCardProps) => {
  return (
    <li
      className={clsx(
        'mg-rounded-xl mg-border mg-border-gray-100',
        'mg-p-4'
      )}
      key={`dashboard-sheet-list-${sheet.id}`}
    >
      <Flex gap={8} align={'center'} justify={'between'}>
        <Flex>
          {sheet.sheetUsers.map((s, i) => (
            <div
              key={`dashboard-sheet-list-user-icon-${sheet.id}`}
              className={clsx(i === 0 ? '' : '-mg-ml-4')}
            >
              <UserIcon color={s.color} />
            </div>
          ))}
        </Flex>
        <Flex direction={'column'} align={'end'}>
          <Flex gap={1} align={'center'}>
            <UsersIcon className={clsx('mg-size-6 mg-fill-gray-500')} />
            <Typography
              className={clsx('mg-font-semibold')}
              size={'sm'}
              theme={'description'}
            >
              {sheet.sheetUsers.map((u) => u.nickname).join(' / ')}
            </Typography>
          </Flex>
          <Flex gap={1} align={'center'}>
            <Typography
              className={clsx('mg-font-semibold')}
              size={'sm'}
              theme={'description'}
            >
              {formatDate(sheet.createdAt, 'yyyy/MM/dd')}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <Typography
        as={'h3'}
        size={'lg'}
        className={clsx('mg-font-bold', 'mg-mt-4')}
      >
        {sheet.title
          ? sheet.title
          : `${formatDate(new Date(sheet.createdAt), 'yyyy/MM/dd')}のシート`}
      </Typography>
    </li>
  )
}
