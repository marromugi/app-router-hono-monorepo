/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, ZodType, z } from 'zod'

// zod
export type SchemaType<U extends ZodType<any, any, any>> = z.infer<U>
