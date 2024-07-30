import { z } from '@/libs/zod'

export const schema = z.object({
  name: z.requiredString({})
})
