import { createApp } from '@api/libs/hono'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

const app = createApp().get('/', async (c) => {
  try {
    const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.DB) })
    const { userId } = c.get('jwtPayload')

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true
      }
    })

    return c.json(user, 200)
  } catch (e) {
    console.log(e)
    return c.json({ message: 'unexpected error' }, 500)
  }
})

export default app
