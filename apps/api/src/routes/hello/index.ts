import { createApp } from '@/libs/hono'
import { z } from '@/libs/zod'
import { zValidator } from '@hono/zod-validator'

const app = createApp().get(
  '/',
  zValidator(
    'query',
    z.object({
      name: z.requiredString({}),
    })
  ),
  async (c) => {
    try {
      const { name } = c.req.valid('query')

      // setCookie(c, COOKIE_ID.sheetUser(sheet.sheetId), user.userId, {
      //   expires: new Date(Math.round(Date.now() + 60 * 60 * 24 * 7)),
      //   httpOnly: true,
      //   sameSite: 'lax',
      //   secure: true
      // })

      if (!name) {
        return c.json({error: 'Not Found'}, 404)
      }

      return c.json({message: `Hello, ${name}!`}, 200)
    } catch (e) {
      return c.json({ message: 'system error', code: 500 }, 500)
    }
  }
).post(
  '/',
  zValidator(
    'json',
    z.object({
      name: z.requiredString({}),
    }),
    async (result, c) => {
      if (!result.success) {
        return c.json({ message: result.error.message }, 400)
      }
    }
  ),
  async (c) => {
    try {
      const { name } = c.req.valid('json')

      // setCookie(c, COOKIE_ID.sheetUser(sheet.sheetId), user.userId, {
      //   expires: new Date(Math.round(Date.now() + 60 * 60 * 24 * 7)),
      //   httpOnly: true,
      //   sameSite: 'lax',
      //   secure: true
      // })

      if (!name) {
        return c.json({error: 'Not Found'}, 404)
      }


      return c.json({message: `Hello, ${name}!`}, 200)
    } catch (e) {
      return c.json({ message: 'system error', code: 500 }, 500)
    }
  }
)

export default app
