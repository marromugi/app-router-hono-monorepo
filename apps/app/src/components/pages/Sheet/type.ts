import { EndpointResponseWithStatusCode } from '@/libs/hono/hooks'
import { ApiType } from '@tumi/api'

export type SheetResponse = EndpointResponseWithStatusCode<
  ApiType,
  '/api/sheet/:id',
  'get',
  200
>
