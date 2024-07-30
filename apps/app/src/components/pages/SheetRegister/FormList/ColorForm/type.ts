import { UserColor } from '@/types/domain'

export type ColorFormProps = {
  omittedColor?: UserColor
  onSubmit: (color: UserColor) => void
}
