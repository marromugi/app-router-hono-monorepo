import { createApp } from '@/libs/hono'
import { generateAlphanumericString } from '@/libs/node/crypto'
import { z } from '@/libs/zod'
import { domainSchema } from '@/libs/zod/domain'
import { SchemaType } from '@/types/lib'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

const getDefaultCategoryLabel = (
  type: SchemaType<ReturnType<typeof domainSchema.paymentCategory>>
) => {
  switch (type) {
    case 'eat': {
      return '食費'
    }
    case 'daily-use-items': {
      return '日用品'
    }
    case 'house': {
      return '生活費'
    }
    case 'play': {
      return '娯楽'
    }
    case 'travel': {
      return '交通費'
    }
  }
}

const app = createApp().post(
  '/',
  zValidator(
    'json',
    z.object({
      title: z.optionalString(),
      category: domainSchema.paymentCategory(),
      amount: z.number(),
      splitting: z.array(
        z.object({
          userId: z.requiredString({}),
          percentage: z.number(),
          amount: z.number()
        })
      ),
      userId: z.requiredString({})
    }),
    async (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.message }, 400)
      }
    }
  ),
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
      const { title, category, amount, splitting, userId } =
        c.req.valid('json')
      const { id } = c.req.valid('param')
      const prisma = new PrismaClient({
        adapter: new PrismaD1(c.env.DB)
      })

      const paymentId = generateAlphanumericString(24)

      const payment = await prisma.payment.create({
        data: {
          amount,
          paymentId,
          splits: {
            createMany: {
              data: splitting.map((s) => ({
                amount: s.amount,
                percentage: s.percentage,
                sheetUserId: s.userId
              }))
            }
          },
          status: 'done',
          sheetUserId: userId,
          title: title ?? getDefaultCategoryLabel(category),
          sheetId: id
        }
      })

      return c.json(payment, 200)
    } catch (e) {
      return c.json({ message: 'system error' }, 500)
    }
  }
)

export default app
