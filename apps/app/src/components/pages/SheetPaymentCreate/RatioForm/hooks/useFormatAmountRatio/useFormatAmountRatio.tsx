import { useMemo } from 'react'

export const useFormatAmountRatio = ({
  totalAmounts,
  ratio,
  users
}: {
  totalAmounts: number
  ratio: number
  users: { id: string }[]
}) => {
  const ratioAmounts = useMemo(() => {
    const values = users.map((_, i) => (i === 0 ? 100 - ratio : ratio))
    const amounts = values.map((v) =>
      Math.ceil(v * totalAmounts * 0.01)
    )
    const curretTotalAmounts = amounts.reduce((prev, next) => {
      return prev + next
    }, 0)

    // 四捨五入によってずれた値を修正する
    // 調整は一人目のユーザーの金額に対して行われる
    if (curretTotalAmounts !== totalAmounts) {
      const diff = curretTotalAmounts - totalAmounts
      amounts[0] -= diff
    }

    return new Map(
      users.map((u, i) => [
        u.id,
        { amount: amounts[i], percentage: values[i] }
      ])
    )
  }, [ratio, totalAmounts, users])

  return {
    ratioAmounts
  }
}
