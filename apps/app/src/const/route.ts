export const ROUTES = {
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  sheet: (id: string) => `/sheet/${id}`,
  sheetCreate: 'sheet/create',
  sheetCreateComplete: ({
    code,
    id,
    expiredAt
  }: {
    code: string
    id: string
    expiredAt: string
  }) => {
    const searchParams = new URLSearchParams()
    searchParams.set('code', code)
    searchParams.set('id', id)
    searchParams.set('expiredAt', expiredAt)
    return `/sheet/create/complete?${searchParams.toString()}`
  },
  sheetPaymentCreate: (id: string) => `/sheet/${id}/payment/add`
}
