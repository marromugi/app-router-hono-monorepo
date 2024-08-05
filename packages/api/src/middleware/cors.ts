import { createApp } from '@api/libs/hono'
import { cors } from 'hono/cors'

export const app = createApp().use('/', (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.APP_DOMAIN,
    credentials: true
  })

  return corsMiddlewareHandler(c, next)
})

export default app
