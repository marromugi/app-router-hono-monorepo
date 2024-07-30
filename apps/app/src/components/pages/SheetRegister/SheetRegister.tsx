import { client } from '@/libs/hono'
import { cookies } from 'next/headers'
import { InvalidNotification } from './InvalidNotification'
import { FormList } from './FormList'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/const/route'

export const SheetInvitedPage = async ({
  params,
  searchParams: { code }
}: {
  params: { id: string }
  searchParams: { code?: string }
}) => {
  const requestInit = {
    headers: {
      cookie: cookies().toString()
    }
  }
  const sheetRegisterInfoRes = await client.api.sheet[
    ':id'
  ].register.$get(
    {
      param: { id: params.id },
      query: {
        code: code ?? ''
      }
    },
    requestInit
  )

  const getSheetRegisterInfo = async () => {
    const res = sheetRegisterInfoRes

    if (res.status === 200) {
      return await res.json()
    }

    return null
  }

  const getSheetRegisterInfoErrorMessage = async () => {
    const res = sheetRegisterInfoRes

    if (res.status === 200) {
      return null
    }

    if (res.status === 401) {
      return await res.json()
    }

    return null
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
  const sheetRegisterInfoErrorMessages =
    await getSheetRegisterInfoErrorMessage()
  const sheetRegisterInfo = await getSheetRegisterInfo()
  const isLoggedIn = !!me

  // 必要な情報が取れない場合は画面遷移
  if (!code || !sheetRegisterInfo) {
    redirect(isLoggedIn ? ROUTES.dashboard : ROUTES.login)
  }

  return (
    <>
      <FormList
        sheet={sheetRegisterInfo}
        isLoggedIn={isLoggedIn}
        me={me}
        code={code}
      />
      {sheetRegisterInfoErrorMessages && (
        <InvalidNotification
          messages={sheetRegisterInfoErrorMessages}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  )
}
