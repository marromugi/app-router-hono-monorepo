import { z } from '@/libs/zod'

export const schema = z.object({
  title: z.requiredString({})
})
