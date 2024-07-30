import { SchemaType } from '@/types/lib'
import { schema } from './schema'

export type NameFormProps = {
  defaultValues: SchemaType<typeof schema>
  onSubmit: (name: string) => void
}
