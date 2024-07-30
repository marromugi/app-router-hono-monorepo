import { UserColor } from '@/types/domain'

export type RadioFormProps = {
  users: {
    id: string
    color: UserColor
    nickname: string
  }[]
  totalAmounts: number
  onSubmit: (
    values: { userId: string; amount: number; percentage: number }[]
  ) => void
}
