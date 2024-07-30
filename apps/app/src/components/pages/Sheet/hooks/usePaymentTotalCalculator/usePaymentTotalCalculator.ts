import { SheetResponse } from '../../type'

export const usePaymentTotalCalculator = () => {
  const calculateTotal = (
    payments: SheetResponse['payments'],
    sheetUsers: SheetResponse['sheetUsers'],
    me: SheetResponse['sheetUsers'][number]
  ) => {
    const total = payments.reduce((prev: number, next) => {
      if (next.splits.length >= 2) {
        return next.splits.reduce(
          (p, n) =>
            n.sheetUser.id === me.id ? p - n.amount : p + n.amount,
          prev
        )
      }
      return next.sheetUser.id === me.id
        ? prev - next.amount
        : prev + next.amount
    }, 0)
    const anotherUser = sheetUsers.find((u) => u.id !== me.id)

    if (total === 0) {
      return null
    }

    if (!anotherUser) {
      return { amount: Math.abs(total), from: me }
    }

    return total < 0
      ? { amount: Math.abs(total), from: anotherUser, to: me }
      : { amount: Math.abs(total), from: me, to: anotherUser }
  }

  return { calculateTotal }
}
