import { createApp } from '@/libs/hono'
import { z } from '@/libs/zod'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

const app = createApp().get(
  '/',
  zValidator(
    'param',
    z.object({
      id: z.requiredString({})
    })
  ),
  async (c) => {
    try {
      const prisma = new PrismaClient({
        adapter: new PrismaD1(c.env.DB)
      })
      const { id } = c.req.valid('param')
      const { userId } = c.get('jwtPayload')

      const user = await prisma.sheetUser.findFirst({
        where: {
          sheetId: id,
          userId
        },
        select: {
          id: true,
          nickname: true,
          color: true
        }
      })

      return c.json(user, 200)
    } catch (e) {
      return c.json({}, 500)
    }
  }
)

export default app
