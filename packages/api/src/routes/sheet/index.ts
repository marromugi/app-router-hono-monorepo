import { createApp } from '@api/libs/hono'
import { generateAlphanumericString } from '@api/libs/node/crypto'
import { z } from '@api/libs/zod'
import { domainSchema } from '@api/libs/zod/domain'
import { adjustDate } from '@api/utils/date'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

import crypto from 'node:crypto'

const app = createApp()
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        userId: z.requiredString({}),
        title: z.requiredString({}),
        name: z.requiredString({}),
        color: z.domain.userColor()
      }),
      async (result, c) => {
        if (!result.success) {
          return c.json({ message: result.error.message }, 400)
        }
      }
    ),
    async (c) => {
      try {
        const { userId, name, color, title } = c.req.valid('json')
        const prisma = new PrismaClient({
          adapter: new PrismaD1(c.env.DB)
        })

        // シート作成（トランザクションが張れないので、コード側でIDを作成・使いまわす）
        let isValidSheetId = false
        let sheetId = ''

        // idの重複防止
        while (!isValidSheetId) {
          sheetId = generateAlphanumericString(16)

          try {
            const existingSheet = await prisma.sheet.findUnique({
              where: { id: sheetId }
            })

            isValidSheetId = !existingSheet // existingSheetがnullならば有効なIDとする
          } catch (error) {
            console.error('Error checking sheet ID:', error)
            return c.json(
              { message: 'unexpected error has occured' },
              500
            )
          }
        }

        const now = new Date()
        const sheet = await prisma.sheet.create({
          select: {
            code: true,
            code_expired_at: true,
            id: true
          },
          data: {
            id: sheetId,
            code: crypto.randomUUID(),
            code_expired_at: adjustDate(now, 1),
            title
          }
        })

        // シートユーザー作成
        const sheetUserId = crypto.randomUUID()
        await prisma.sheetUser.create({
          data: {
            nickname: name,
            color,
            id: sheetUserId,
            userId,
            sheetId
          }
        })

        return c.json(sheet, 200)
      } catch (e) {
        return c.json({ message: 'system error' }, 500)
      }
    }
  )
  .get('/', async (c) => {
    try {
      const prisma = new PrismaClient({
        adapter: new PrismaD1(c.env.DB)
      })
      const { userId } = c.get('jwtPayload')

      const sheets = await prisma.sheet.findMany({
        where: {
          sheetUsers: {
            some: {
              userId
            }
          }
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          sheetUsers: {
            select: {
              id: true,
              nickname: true,
              color: true
            }
          }
        }
      })

      // color の型を効かせるためにパース
      const resSchema = z.array(
        z.object({
          id: z.requiredString({}),
          title: z.optionalString(),
          createdAt: z.date(),
          updatedAt: z.date(),
          sheetUsers: z.array(
            z.object({
              id: z.requiredString({}),
              nickname: z.requiredString({}),
              color: domainSchema.userColor()
            })
          )
        })
      )

      const parsedSheets = resSchema.parse(sheets)

      if (parsedSheets) {
        return c.json({ sheets: parsedSheets }, 200)
      }

      return c.json({ sheets: [] }, 200)
    } catch (e) {
      console.log(e)
      return c.json({ message: 'unexpected error' }, 500)
    }
  })

export default app
