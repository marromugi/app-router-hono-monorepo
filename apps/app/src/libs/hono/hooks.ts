import { ApiType } from '@tumi/api'
import type { Hono, Schema } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'

export type Endpoint<T> =
  T extends Hono<any, infer S, any>
    ? S extends Record<infer K, Schema>
      ? K extends string
        ? K extends `${infer _A}*${infer _B}`
          ? never
          : K
        : never
      : never
    : never

export type ClientSchema<T> =
  T extends Hono<any, infer S, any> ? S : never
export type EndpointSchema<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>
> = ClientSchema<T>[E]

type EndpointMethod<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>
> =
  ClientSchema<T>[E] extends Record<infer D, any>
    ? D extends string
      ? D extends `$${infer M}`
        ? M
        : never
      : never
    : never

export type EndpointResponse<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod
> = ClientSchema<T>[E][`$${M}`] extends { output: infer R } ? R : never

type EndpointStatusCode<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod
> = ClientSchema<T>[E][`$${M}`] extends { status: infer R }
  ? R extends number
    ? R
    : never
  : StatusCode

type DefaultEndpointRequest = {
  json?: Record<string, any>
  query?: Record<string, any>
  param?: Record<string, any>
}

type EndpointRequest<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod
> = ClientSchema<T>[E][`$${M}`] extends { input: infer R }
  ? {} extends R
    ? DefaultEndpointRequest
    : R
  : never

type EndpointQueryParameter<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod
> = ClientSchema<T>[E][`$${M}`] extends { input: infer R }
  ? R extends { query: infer Q }
    ? Q
    : never
  : never

type EndpointRequestBody<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod
> = ClientSchema<T>[E][`$${M}`] extends { input: infer R }
  ? R extends { json: infer Q }
    ? Q
    : never
  : never

export type EndpointResponseWithStatusCode<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod,
  C extends StatusCode
  //   C extends EndpointStatusCode<T, E, M>
> = ClientSchema<T>[E][`$${M}`] extends
  | { output: infer R; status: C }
  | { output: any; status: number }
  ? R
  : never

type EndpointResponseWithoutStatusCode<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod,
  C extends EndpointStatusCode<T, E, M>
> = ClientSchema<T>[E][`$${M}`] extends infer U
  ? U extends { output: infer R; status: infer S }
    ? S extends C
      ? never
      : R
    : never
  : never

type ExcludeEndpointStatusCode<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod,
  C extends EndpointStatusCode<T, E, M>
> = ClientSchema<T>[E][`$${M}`] extends { status: infer R }
  ? R extends C
    ? never
    : R
  : never

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

type FilterEndpoint<
  T extends Hono<any, any, any>,
  M extends HttpMethod
> = {
  [K in keyof ClientSchema<T>]: ClientSchema<T>[K] extends Record<
    `$${M}`,
    any
  >
    ? K
    : never
}[keyof ClientSchema<T>]

type B = FilterEndpoint<ApiType, 'post'>

type FilterEndpoints<
  T extends Hono<any, any, any>,
  M extends HttpMethod[]
> = {
  [K in keyof ClientSchema<T>]: M extends (infer Method)[]
    ? Method extends HttpMethod
      ? ClientSchema<T>[K] extends Record<`$${Method}`, any>
        ? K
        : never
      : never
    : never
}[keyof ClientSchema<T>]

type RemoveNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}
interface EndpointRequestInitInterface<
  E extends Endpoint<T>,
  M extends HttpMethod,
  T extends Hono<any, any, any> = ApiType
> extends RequestInit {
  method?: never
  body?: EndpointRequestBody<T, E, M>
}

type EndpointRequestInit<
  E extends Endpoint<T>,
  M extends HttpMethod,
  T extends Hono<any, any, any> = ApiType
> = RemoveNever<EndpointRequestInitInterface<E, M, T>>

interface EndpointFetchResponseInterface<S extends StatusCode, R>
  extends Response {
  status: S
  json: () => Promise<R>
}

type EndpointFetchResponse<
  T extends Hono<any, any, any>,
  E extends Endpoint<T>,
  M extends HttpMethod,
  C extends StatusCode
> = ClientSchema<T>[E][`$${M}`] extends infer U
  ? U extends { output: infer R; status: infer S }
    ? S extends C
      ? EndpointFetchResponseInterface<S, R>
      : never
    : never
  : never

// type EndpointFetchResponse<T extends Hono<any, any, any>, E extends Endpoint<T>,
// M extends HttpMethod,
// C extends StatusCode,> = ClientSchema<T>[E][`$${M}`] extends infer U
// ? U extends { output: infer R; status: infer S }
//   ? S extends StatusCode ? EndpointFetchResponseInterface<T, E, M, S> : never
//   : never
// : never

const client = <
  E extends Endpoint<T>,
  M extends HttpMethod,
  T extends Hono<any, any, any>
>(
  endpoint: E,
  method: M
) => {
  return async <
    Input extends EndpointRequest<T, E, M>,
    Init extends EndpointRequestInit<E, M, T>
  >(
    baseURL: string,
    input: Input,
    init?: Init
  ) => {
    const { json, query, param } = {
      json: {},
      query: {},
      param: {},
      ...input
    }

    console.log(`${baseURL}${endpoint}`)
    const queryString = new URLSearchParams(query).toString()

    const url = new URL(`${baseURL}${endpoint}`)
    url.search = queryString

    const requestOptions: RequestInit = {
      credentials: 'include',
      mode: 'cors',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      ...init,
      method: method.toUpperCase()
    }

    if (json) {
      requestOptions.body = JSON.stringify(json)
    }

    Object.keys(param).forEach((key) => {
      const value = param[key]
      url.pathname = url.pathname.replace(`:${key}`, value)
    })

    const response = await fetch(url, requestOptions)
    return response as EndpointFetchResponse<
      T,
      E,
      M,
      EndpointStatusCode<T, E, M>
    >
  }
}

export const useQuery = <
  E extends Endpoint<T>,
  C extends EndpointStatusCode<T, E, 'get'>,
  M extends HttpMethod = 'get',
  T extends Hono<any, any, any> = ApiType
>(
  endpoint: E,
  status: C,
  input: EndpointRequest<T, E, M>,
  init: EndpointRequestInit<E, M, T>,
  config: SWRConfiguration<
    EndpointResponseWithStatusCode<T, E, M, C>,
    EndpointFetchResponse<
      T,
      E,
      M,
      Exclude<EndpointStatusCode<T, E, M>, C>
    >
  >
) => {
  return useSWR(
    `${endpoint}-${status}-${JSON.stringify(input)}`,
    async () => {
      const c = client<E, 'get', T>(endpoint, 'get')
      const res = (await c(
        process.env.NEXT_PUBLIC_API_URL ?? '',
        input,
        init
      )) as Response

      if (res.status !== status) {
        throw res
      }

      return (await res.json()) as EndpointResponseWithStatusCode<
        T,
        E,
        M,
        C
      >
    },
    config
  )
}

// const { data } = Query(
//   '/api/hello',
//   200,
//   { query: { name: '' } },
//   {},
//   {
//     onSuccess: (d) => {
//       d
//     },
//     onError: (e) => {
//       switch (e.status) {
//         case 404: {
//           e.json()
//         }
//       }
//     }
//   }
// )

export const useMutation = <
  E extends Endpoint<T>,
  C extends EndpointStatusCode<T, E, M>,
  M extends HttpMethod,
  T extends Hono<any, any, any> = ApiType
>(
  endpoint: E,
  method: M,
  status: C,
  config: SWRMutationConfiguration<
    EndpointResponseWithStatusCode<T, E, M, C>,
    EndpointFetchResponse<
      T,
      E,
      M,
      Exclude<EndpointStatusCode<T, E, M>, C>
    >,
    string,
    EndpointRequest<T, E, M>
  >,
  init?: EndpointRequestInit<E, M, T>
) => {
  return useSWRMutation(
    `${endpoint}-${status}`,
    async (_key: string, { arg }) => {
      const c = client<E, M, T>(endpoint, method)
      const res = (await c(
        process.env.NEXT_PUBLIC_API_URL ?? '',
        arg,
        init
      )) as Response

      if (res.status !== status) {
        throw res
      }

      return (await res.json()) as EndpointResponseWithStatusCode<
        T,
        E,
        M,
        C
      >
    },
    config
  )
}

// const { trigger } = useMutation(
//   '/api/hello',
//   'post',
//   200,
//   {},
//   {
//     onSuccess: (d) => {
//       d
//     },
//     onError: (e) => {
//       switch (e.status) {
//         case 404: {
//           e.json()
//         }
//       }
//     }
//   }
// )
