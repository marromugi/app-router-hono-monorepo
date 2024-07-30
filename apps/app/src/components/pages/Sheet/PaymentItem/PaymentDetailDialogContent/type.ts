import { SheetResponse } from '../../type'

export type PaymentDetailDialogContentProps = {
  payment: SheetResponse['payments'][number]
  sheet: SheetResponse
  onClose: () => void
}
