'use client'

import { Flex } from '@/components/layouts'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { UserCardProps } from './type'
import { motion } from 'framer-motion'
import { COLOR_CARD_VARIANTS } from '@/components/pages/SheetCreate/const'
import { COLOR_BADGE_VARIANTS } from '@/components/pages/SheetCreate/ColorForm/const'

export const UserCard = ({ name, color, isSelected, onClick }: UserCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0.6 }}
      whileTap={{ scale: 0.95 }}
      whileInView={{ opacity: 1 }}
      onClick={() => {
        onClick(name)
      }}
    >
      <Flex
        center
        direction={'column'}
        gap={6}
        className={clsx(
          'mg-p-4',
          'mg-w-full',
          'mg-relative mg-overflow-hidden mg-rounded-xl',
          COLOR_CARD_VARIANTS({ color })
        )}
      >
        <div className={clsx('mg-rounded-full mg-size-10', COLOR_BADGE_VARIANTS({ color }))}></div>
        <Typography size={'sm'} className={clsx('mg-font-semibold')}>
          {name}
        </Typography>
        <div className={clsx('mg-absolute mg-size-full', 'mg-transition-opacity')}></div>
      </Flex>
    </motion.button>
  )
}
