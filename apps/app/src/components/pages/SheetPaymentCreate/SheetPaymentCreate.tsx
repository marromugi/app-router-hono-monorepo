import { client } from '@/libs/hono'
import { FormList } from './FormList'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/const/route'

export const SheetPaymentCreatePage = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const requestInit = {
    headers: {
      cookie: cookies().toString()
    }
  }
  const getSheetUsers = async () => {
    const res = await client.api.sheet[':id'].user.$get(
      {
        param: { id }
      },
      requestInit
    )

    if (res.status === 200) {
      const data = await res.json()
      return data.users
    }

    return []
  }

  const getMe = async () => {
    const res = await client.api.sheet[':id'].me.$get(
      {
        param: { id }
      },
      requestInit
    )

    if (res.status === 200) {
      return await res.json()
    }

    return null
  }

  const sheetUsers = await getSheetUsers()
  const me = await getMe()

  if (!me) {
    redirect(ROUTES.sheet(id))
  }

  return <FormList id={id} me={me} users={sheetUsers} />
}
