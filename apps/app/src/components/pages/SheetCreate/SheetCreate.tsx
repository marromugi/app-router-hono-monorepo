import { cookies } from 'next/headers'
import { FormList } from './FormList'
import { client } from '@/libs/hono'

export const SheetCreatePage = async () => {
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

  return <>{me && <FormList user={me} />}</>
}
