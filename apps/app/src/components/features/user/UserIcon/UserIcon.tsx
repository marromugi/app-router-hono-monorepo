import { USER_ICON_VARIANTS } from './const'
import { UserIconProps } from './type'

export const UserIcon = ({ color, size = 'md' }: UserIconProps) => {
  return <span className={USER_ICON_VARIANTS({ color, size })} />
}
