import { Variables } from '@api/libs/hono'
import { Sheet, User } from '@prisma/client'

/**JWTのペイロードをもとに対象のシートに権限があるか確認する */
export const checkAuthorization = (
  sheet: Pick<Sheet, 'id'> & { users: Pick<User, 'id'>[] },
  jwtPayload: Variables['jwtPayload']
) => {
  return sheet.users.some((u) => u.id === jwtPayload.userId)
}
