import { createApp } from '@api/libs/hono'
import { jwt } from 'hono/jwt'

const app = createApp().use('/', (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.API_SECRET_KEY,
    alg: 'HS256'
  })
  return jwtMiddleware(c, next)
})

export default app
