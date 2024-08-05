import { COOKIE_ID } from '@/const/cookie'
import { createApp } from '@/libs/hono'
import { generateSalt, hashPassword } from '@/libs/node/crypto'
import { z } from '@/libs/zod'
import { zValidator } from '@hono/zod-validator'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'

const app = createApp().post(
  '/',
  zValidator(
    'json',
    z.object({
      id: z.alphabetAndNumber(),
      name: z.requiredString({}),
      password: z.alphabetAndNumber()
    }),
    async (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.message }, 400)
      }
    }
  ),
  async (c) => {
    try {
      const { name, password, id } = c.req.valid('json')
      const prisma = new PrismaClient({
        adapter: new PrismaD1(c.env.DB)
      })

      const salt = generateSalt()
      const hashedPassword = hashPassword(password, salt)
      const user = await prisma.user.create({
        data: {
          id,
          name,
          password: hashedPassword,
          password_salt: salt
        }
      })

      // トークンをクッキーに設定
      const token = await sign(
        {
          exp: Math.round(Date.now() / 1000 + 60 * 60 * 24 * 7),
          userId: user.id
        },
        c.env.API_SECRET_KEY,
        'HS256'
      )
      setCookie(c, COOKIE_ID.accessToken, token, {
        expires: new Date(Math.round(Date.now() + 60 * 60 * 24 * 7)),
        httpOnly: true,
        sameSite: 'lax',
        secure: true
      })

      return c.json({ message: 'success!' }, 200)
    } catch (e) {
      console.error(e)
      return c.json({ message: 'system error' }, 500)
    }
  }
)

export default app
