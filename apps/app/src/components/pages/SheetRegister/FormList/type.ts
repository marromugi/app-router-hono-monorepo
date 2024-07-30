import { IntroductionProps } from '../Introduction/type'

export type FormListProps = IntroductionProps & {
  code: string
  me?: { id: string; name: string } | null
}
