import { z as BaseZod, ZodType } from 'zod'

export const z = {
  ...BaseZod,
  requiredString: ({ minLength }: { minLength?: number }) =>
    BaseZod.string({ required_error: '必須です' }).min(
      minLength ?? 1,
      minLength ? `${minLength}文字以上入力してください` : '必須です'
    ),
  optionalString: () => BaseZod.string().optional(),
  /**ドメイン情報を含むバリデーション */
  domain: {
    userColor: () =>
      BaseZod.union([
        BaseZod.literal('red'),
        BaseZod.literal('blue'),
        BaseZod.literal('green'),
        BaseZod.literal('purple'),
        BaseZod.literal('yellow'),
        BaseZod.literal('lime')
      ]),
    paymentCategory: BaseZod.union([
      BaseZod.literal('eat'),
      BaseZod.literal('play'),
      BaseZod.literal('house'),
      BaseZod.literal('daily-use-items'),
      BaseZod.literal('travel')
    ])
  }
}

export const safeParse = <T, F>(
  schema: ZodType<T, any, any>,
  value: any,
  fallback: F
) => {
  try {
    return schema.parse(value)
  } catch {
    return fallback
  }
}
