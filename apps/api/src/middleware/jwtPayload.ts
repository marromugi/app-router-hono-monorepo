import { createApp } from '@/libs/hono'

/**JWT Payload をバリデーションするミドルウェア */
const app = createApp().use('/', async (c, next) => {
  const { userId } = c.get('jwtPayload')

  console.log(userId)

  await next()

  if (!userId) {
    c.res = new Response(JSON.stringify({ message: 'invalid token' }), {
      ...c.res,
      status: 401
    })
  }
})

export default app
