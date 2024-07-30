import { SheetResponse } from '../type'

export type PaymentCalculatedMessageProps = {
  sheet: SheetResponse
  me: { id: string; nickname: string }
}
