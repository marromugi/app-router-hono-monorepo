import { ApiType } from "api";
import { hc } from "hono/client";

export const client = hc<ApiType>('http://localhost:8787', {
    init: {
      credentials: 'include',
      mode: 'cors',
      cache: 'no-store'
    }
  })

