'use client'

import { Flex } from '@/components/layouts'
import { ClipboardDocumentIcon } from '@heroicons/react/16/solid'
import { Typography } from '@magi-ui/core'
import clsx from 'clsx'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export const CopyField = () => {
  const [isHidden, setHidden] = useState(false)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const code = searchParams.get('code')
  const [link, setLink] = useState(
    `${process.env.NEXT_PUBLIC_APP_URL}/sheet/${id}/invited?code=${code}`
  )

  const handleCopy = () => {
    const _link = link
    setHidden(true)
    setTimeout(() => {
      navigator.clipboard.writeText(_link)
      setLink('コピーしました✨')
      setHidden(false)
    }, 400)
    setTimeout(() => {
      setHidden(true)
    }, 1600)
    setTimeout(() => {
      setLink(_link)
      setHidden(false)
    }, 2000)
  }
  return (
    <Flex
      as={'button'}
      gap={2}
      justify={'between'}
      align={'center'}
      className={clsx(
        'mg-w-full',
        'mg-p-4 mg-rounded mg-bg-gray-50',
        'mg-border-gray-100 mg-border-gray',
        'mg-text-sm mg-text-gray-600'
        //'mg-font-semibold'
      )}
      onClick={handleCopy}
    >
      <motion.div
        animate={{
          scale: isHidden ? 0.8 : 1.0,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ ease: 'backOut', duration: 0.3 }}
        className={clsx('mg-w-[calc(100%_-_32px)]')}
      >
        <Typography
          theme={'description'}
          size={'sm'}
          id={'copy-field-link'}
          className={clsx('mg-truncate mg-text-left')}
        >
          {link}
        </Typography>
      </motion.div>
      <ClipboardDocumentIcon className={clsx('mg-size-4')} />
    </Flex>
  )
}
