import { DefaultCategory, UserColor } from '@/types/domain'

export type FormListProps = {
  id: string
  users: {
    id: string
    color: UserColor
    nickname: string
  }[]
  me: {
    id: string
  }
}

export type SheetPaymentCreateFormValues = {
  name: string
  amount: number
  category: DefaultCategory
  ratio: { userId: string; amount: number; percentage: number }[]
}
