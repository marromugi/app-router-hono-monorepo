'use client'

import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import QRCode from 'qrcode.react'

export const LinkQrCode = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const code = searchParams.get('code')
  return (
    <QRCode
      className={clsx('mg-w-[320px]')}
      value={`${process.env.NEXT_PUBLIC_APP_URL}/sheet/${id}/invited?code=${code}`}
    />
  )
}
