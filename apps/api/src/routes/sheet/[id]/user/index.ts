import { createApp } from '@/libs/hono'
import { z } from '@/libs/zod'
import { domainSchema } from '@/libs/zod/domain'
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

      const users = await prisma.sheetUser.findMany({
        where: {
          sheetId: id
        },
        select: {
          id: true,
          nickname: true,
          color: true
        }
      })

      // color の型を効かせるためにパース
      const resSchema = z.array(
        z.object({
          id: z.requiredString({}),
          nickname: z.requiredString({}),
          color: domainSchema.userColor()
        })
      )

      const parsedUsers = resSchema.parse(users)

      if (parsedUsers) {
        return c.json({ users: parsedUsers }, 200)
      }

      return c.json({ users: [] }, 200)
    } catch (e) {
      return c.json({}, 500)
    }
  }
)

export default app
