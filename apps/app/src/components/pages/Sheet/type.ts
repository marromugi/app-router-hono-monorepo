import { EndpointResponseWithStatusCode } from '@/libs/hono/hooks'
import { ApiType } from 'api'

export type SheetResponse = EndpointResponseWithStatusCode<
  ApiType,
  '/api/sheet/:id',
  'get',
  200
>
