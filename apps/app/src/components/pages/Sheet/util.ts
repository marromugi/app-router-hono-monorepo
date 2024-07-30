import { SheetResponse } from './type'

export const isSameDatePayment = (
  payment1: SheetResponse['payments'][number],
  payment2: SheetResponse['payments'][number]
) => {
  const payment1Date = new Date(payment1.createdAt)
  const paymetn2Date = new Date(payment2.createdAt)

  return (
    payment1Date.getFullYear() === paymetn2Date.getFullYear() &&
    payment1Date.getMonth() === paymetn2Date.getMonth() &&
    payment1Date.getDate() === paymetn2Date.getDate()
  )
}
