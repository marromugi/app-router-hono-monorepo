import { COOKIE_ID } from '@api/lib'
import { createApp } from '@api/libs/hono'
import { getCookie } from 'hono/cookie'

/**Cookie から Bearerトークンを設定するmiddleware */
export const app = createApp().use('/', async (c, next) => {
  const accessToken = getCookie(c, COOKIE_ID.accessToken)
  // console.log('-------bearer--------')
  // console.log(c.req.header())
  const req = new Request(c.req.raw)
  req.headers.set('Authorization', `Bearer ${accessToken}`)
  c.req.raw = req
  // console.log('---------------')

  await next()
})

export default app
