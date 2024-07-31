import { createApp } from '@api/libs/hono'

const app = createApp().get('/', (c) => c.text('Hello 🔥'))

export default app
