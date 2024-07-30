import { UserColor } from '@/types/domain'
import { ComponentProps } from 'react'

export type UserCardProps = {
  name: string
  color: UserColor
  isSelected: boolean
  onClick: (name: string) => void
}
