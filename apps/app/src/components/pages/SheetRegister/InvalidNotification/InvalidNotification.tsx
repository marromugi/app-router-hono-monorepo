'use client'

import { useRouter } from 'next/navigation'
import { InvalidNotificationProps } from './type'
import { useNotification } from '@/hooks'
import { ROUTES } from '@/const/route'
import { useEffect } from 'react'

export const InvalidNotification = ({
  messages,
  isLoggedIn
}: InvalidNotificationProps) => {
  const router = useRouter()
  const { notify } = useNotification()

  useEffect(() => {
    setTimeout(() => {
      notify({ theme: 'error', ...messages })
      router.replace(isLoggedIn ? ROUTES.dashboard : ROUTES.login)
    }, 0)
  }, [isLoggedIn, messages, notify, router])

  return <></>
}
