import { Hono } from 'hono'
import { JwtVariables } from 'hono/jwt'

export type Bindings = {
  MY_KV: KVNamespace
  API_SECRET_KEY: string
  API_PASSWORD_HASH_COUNT: string
  APP_DOMAIN: string
  DB: D1Database
}

export type Variables = {
  [key in keyof JwtVariables]: {
    userId: string
  }
}

export const createApp = () =>
  new Hono<{ Bindings: Bindings; Variables: Variables }>()
