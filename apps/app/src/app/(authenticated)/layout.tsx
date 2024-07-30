import { ROUTES } from '@/const/route'
import { client } from '@/libs/hono'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

  if (!me) {
    redirect(ROUTES.login)
  }

  return children
}
