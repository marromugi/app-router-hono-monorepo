import { Flex } from '@/components/layouts'
import { Button, Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { SelectedUserCardProps } from './type'

export const SelectedUserCard = ({ onChangeUser }: SelectedUserCardProps) => {
  return (
    <div className={clsx('mg-bg-white mg-p-4 mg-rounded-xl', 'mg-mt-12')}>
      <Typography size={'xs'} theme={'description'} className={clsx('mg-font-semibold', 'mg-mb-2')}>
        電気代
      </Typography>
      <Flex align={'center'} justify={'between'}>
        <div>
          <Flex align={'center'} gap={4}>
            <div className={clsx('mg-rounded-full mg-size-10', 'mg-bg-blue-600')}></div>
            <Typography size={'sm'} className={clsx('mg-font-semibold')}>
              marron
            </Typography>
          </Flex>
        </div>
        <Button color={'gray'} variant={'ghost'} size={'xs'} onClick={onChangeUser}>
          変更する
        </Button>
      </Flex>
    </div>
  )
}
