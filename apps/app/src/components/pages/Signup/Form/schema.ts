import { z } from '@/libs/zod'

export const schema = z.object({
  id: z.requiredString({}),
  name: z.requiredString({}),
  password: z.requiredString({})
})
