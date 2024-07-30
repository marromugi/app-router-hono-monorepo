import { VariantProps } from 'tailwind-variants'
import { TOAST_ICON_VARIANTS } from './const'

export type ToastProps = VariantProps<typeof TOAST_ICON_VARIANTS> & {
  message: string
  subMessage?: string
  isVisible: boolean
  onClose?: () => void
}
