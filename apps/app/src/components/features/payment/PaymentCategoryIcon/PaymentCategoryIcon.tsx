import {
  BasketballIcon,
  PlateIcon,
  HouseIcon,
  SocksIcon,
  TrainIcon
} from '@/components/icons'
import { PaymentCategoryIconProps } from './type'

export const PaymentCategoryIcon = ({
  category
}: PaymentCategoryIconProps) => {
  const icons = {
    play: <BasketballIcon />,
    eat: <PlateIcon />,
    house: <HouseIcon />,
    'daily-use-items': <SocksIcon />,
    travel: <TrainIcon />
  } as const

  return icons[category]
}
