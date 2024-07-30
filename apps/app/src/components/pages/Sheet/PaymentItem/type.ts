import { SheetResponse } from '../type'

export type PaymentItemProps = {
  sheet: SheetResponse
  me: { id: string }
  payment: SheetResponse['payments'][number]
  isShowUserInfo: boolean
}
