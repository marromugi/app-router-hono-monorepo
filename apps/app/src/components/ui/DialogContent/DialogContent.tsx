import { DialogContentProps } from './type'
import { twMerge } from 'tailwind-merge'
import { DIALOG_CONTENT_VARIANTS } from './const'

export const DialogContent = ({
  children,
  className,
  color,
  ...props
}: DialogContentProps) => {
  return (
    <div
      {...props}
      className={twMerge(DIALOG_CONTENT_VARIANTS({ color }), className)}
    >
      {children}
    </div>
  )
}
