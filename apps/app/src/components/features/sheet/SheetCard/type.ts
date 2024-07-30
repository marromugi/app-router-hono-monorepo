import { UserColor } from '@/types/domain'

export type SheetCardProps = {
  sheet: {
    id: string
    title?: string
    createdAt: string
    sheetUsers: {
      color: UserColor
      nickname: string
    }[]
  }
}
