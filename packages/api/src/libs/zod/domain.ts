import { z as BaseZod } from 'zod'

export const domainSchema = {
  userColor: () =>
    BaseZod.union([
      BaseZod.literal('red'),
      BaseZod.literal('blue'),
      BaseZod.literal('green'),
      BaseZod.literal('purple'),
      BaseZod.literal('yellow'),
      BaseZod.literal('lime')
    ]),
  paymentCategory: () =>
    BaseZod.union([
      BaseZod.literal('eat'),
      BaseZod.literal('play'),
      BaseZod.literal('house'),
      BaseZod.literal('daily-use-items'),
      BaseZod.literal('travel')
    ])
}
