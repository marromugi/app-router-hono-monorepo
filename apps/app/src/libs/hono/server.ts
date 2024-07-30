import { COOKIE_ID } from 'api'
import { cookies } from 'next/headers'

export const cookieRe = {
  headers: {
    cookie: cookies().toString()
  }
} as const
