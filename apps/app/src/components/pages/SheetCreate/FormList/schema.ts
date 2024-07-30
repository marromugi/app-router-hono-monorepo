import { z } from '@/libs/zod'

export const schema = z.object({
  color: z.domain.userColor(),
  name: z.requiredString({}),
  title: z.requiredString({})
})
