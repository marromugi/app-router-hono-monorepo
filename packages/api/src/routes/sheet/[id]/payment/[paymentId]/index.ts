import { createApp } from '@/libs/hono'
import { z } from '@/libs/zod'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

const app = createApp().delete(
  '/',
  zValidator(
    'param',
    z.object({
      id: z.requiredString({}),
      paymentId: z.requiredString({})
    }),
    async (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.message }, 400)
      }
    }
  ),
  async (c) => {
    try {
      const { id, paymentId } = c.req.valid('param')
      const prisma = new PrismaClient({
        adapter: new PrismaD1(c.env.DB)
      })

      await prisma.payment.delete({
        where: {
          sheetId: id,
          paymentId
        }
      })

      return c.json({ message: 'success' }, 200)
    } catch (e) {
      console.log(e)
      return c.json(
        {
          message: '予期せぬエラーが発生しました。',
          subMessage: 'お手数ですが、時間をおいて再度お試しください。'
        },
        500
      )
    }
  }
)

export default app
