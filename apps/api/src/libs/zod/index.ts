import { VALIDATION_REGEX } from '@/const/validate'
import { z as BaseZod } from 'zod'

export const z = {
  ...BaseZod,
  requiredString: ({ minLength }: { minLength?: number }) =>
    BaseZod.string({ required_error: '必須です' }).min(
      minLength ?? 1,
      minLength ? `${minLength}文字以上入力してください` : '必須です'
    ),
  optionalString: () => BaseZod.string().optional(),
  alphabetAndNumber: () =>
    BaseZod.string({ required_error: '必須です' }).min(1, '必須です').regex(VALIDATION_REGEX.alphabetAndNumber),
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
      ])
  }
}
