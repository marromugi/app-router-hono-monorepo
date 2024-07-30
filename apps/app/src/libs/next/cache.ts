'use server'

import { REVALIDATE_TAGS } from '@/const/revalidate'
import { revalidateTag } from 'next/cache'

export const revalidateSheet = async () => {
  'use server'
  try {
    revalidateTag(REVALIDATE_TAGS.sheet)
    return true
  } catch {
    return false
  }
}
