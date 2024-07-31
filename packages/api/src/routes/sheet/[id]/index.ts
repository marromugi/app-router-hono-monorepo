import { createApp } from '@api/libs/hono'
import { z } from '@api/libs/zod'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

const app = createApp().get(
  '/',
  zValidator(
    'param',
    z.object({
      id: z.requiredString({})
    }),
    async (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.message }, 400)
      }
    }
  ),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const { userId } = c.get('jwtPayload')
      const prisma = new PrismaClient({
        adapter: new PrismaD1(c.env.DB)
      })

      const sheet = await prisma.sheet.findUnique({
        select: {
          id: true,
          title: true,
          sheetUsers: {
            select: {
              id: true,
              nickname: true
            }
          },
          payments: {
            select: {
              amount: true,
              paymentId: true,
              title: true,
              createdAt: true,
              splits: {
                select: {
                  amount: true,
                  percentage: true,
                  sheetUser: {
                    select: {
                      id: true,
                      color: true,
                      nickname: true
                    }
                  }
                }
              },
              sheetUser: {
                select: {
                  id: true,
                  color: true,
                  nickname: true
                }
              }
            },
            orderBy: {
              createdAt: 'asc'
            }
          }
        },
        where: {
          id: id,
          sheetUsers: {
            some: {
              userId
            }
          }
        }
      })

      if (!sheet) {
        return c.json({ message: 'invalid id or password' }, 401)
      }

      return c.json(sheet, 200)
    } catch (e) {
      return c.json({ message: 'system error' }, 500)
    }
  }
)

export default app
