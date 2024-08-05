import { createApp } from '@/libs/hono'

const app = createApp().get('/', (c) => c.text('Hello 🔥'))

export default app
