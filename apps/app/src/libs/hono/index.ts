import { ApiType } from 'api'
import { hc } from 'hono/client'

export const client = hc<ApiType>(
  process.env.NEXT_PUBLIC_API_URL ?? '',
  {
    init: {
      credentials: 'include',
      mode: 'cors',
      cache: 'no-store'
    }
  }
)
