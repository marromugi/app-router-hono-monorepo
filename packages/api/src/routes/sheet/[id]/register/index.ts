import { createApp } from '@api/libs/hono'
import { z } from '@api/libs/zod'
import { domainSchema } from '@api/libs/zod/domain'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

import crypto from 'node:crypto'

type Status400Code =
  | 'invalid-code'
  | 'already-registered'
  | 'max-members'

const app = createApp()
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        userId: z.requiredString({}),
        name: z.requiredString({}),
        color: z.domain.userColor(),
        code: z.requiredString({})
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
        const { userId, name, color, code } = c.req.valid('json')
        const { id } = c.req.valid('param')
        const prisma = new PrismaClient({
          adapter: new PrismaD1(c.env.DB)
        })

        const sheet = await prisma.sheet.findUnique({
          select: {
            code: true,
            code_expired_at: true,
            id: true,
            sheetUsers: {
              select: {
                userId: true
              }
            }
          },
          where: {
            id
          }
        })

        if (!sheet) {
          return c.json(
            { message: 'シートが見つかりません。', subMessage: null },
            404
          )
        }

        if (sheet.sheetUsers.length > 1) {
          return c.json(
            {
              message: '定員に達しています',
              subMessage:
                '招待されたシートはすでに定員となっています。シートが必要な場合は、新しく作成してください。',
              type: 'max-members' as Status400Code
            },
            400
          )
        }

        const now = new Date()
        const expiredAt = new Date(sheet.code_expired_at)

        const isValidCode = now <= expiredAt && sheet.code === code

        if (!isValidCode) {
          return c.json(
            {
              message: 'コードが不正です',
              subMessage:
                '期限が切れている場合は、招待者に新しい招待リンクを発行してもらい再度アクセスしてください。',
              type: 'invalid-code' as Status400Code
            },
            400
          )
        }

        const isAlreadyRegistered = sheet.sheetUsers.some(
          (u) => u.userId === userId
        )
        if (isAlreadyRegistered) {
          return c.json(
            {
              message: '既に登録されています',
              subMessage:
                'あなたのアカウントはすでに登録されています。ユーザーを招待する場合は、他のユーザーに招待リンクを共有して下さい。',
              type: 'already-registered' as Status400Code
            },
            400
          )
        }

        // シートユーザー作成
        const sheetUserId = crypto.randomUUID()
        await prisma.sheetUser.create({
          data: {
            nickname: name,
            color,
            id: sheetUserId,
            userId,
            sheetId: id
          }
        })

        return c.json(sheet, 200)
      } catch (e) {
        return c.json({ message: 'system error' }, 500)
      }
    }
  )
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        code: z.requiredString({})
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
        const prisma = new PrismaClient({
          adapter: new PrismaD1(c.env.DB)
        })
        const { id } = c.req.valid('param')
        const { code } = c.req.valid('query')

        const now = new Date()
        const sheet = await prisma.sheet.findUnique({
          where: {
            id,
            code,
            code_expired_at: {
              gt: now
            }
          },
          select: {
            id: true,
            title: true,
            createdAt: true,
            sheetUsers: {
              select: {
                id: true,
                nickname: true,
                color: true
              }
            }
          }
        })

        if (!sheet) {
          return c.json(
            {
              message: '権限がありません',
              subMessage: '招待リンクをご確認ください。'
            },
            401
          )
        }

        // color の型を効かせるためにパース
        const resSchema = z.object({
          id: z.requiredString({}),
          title: z.optionalString(),
          createdAt: z.date(),
          sheetUsers: z.array(
            z.object({
              id: z.requiredString({}),
              nickname: z.requiredString({}),
              color: domainSchema.userColor()
            })
          )
        })
        const parsedSheets = resSchema.parse(sheet)
        if (parsedSheets) {
          return c.json(parsedSheets, 200)
        }
        return c.json(null, 200)
      } catch (e) {
        console.log(e)
        return c.json({ message: 'unexpected error' }, 500)
      }
    }
  )

export default app
