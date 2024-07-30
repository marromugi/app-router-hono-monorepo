import { z } from '@/libs/zod'

export const schema = z.object({
  keyword: z.requiredString({})
})
