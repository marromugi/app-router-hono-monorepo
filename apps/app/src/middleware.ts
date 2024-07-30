import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { COOKIE_ID } from 'api'

// export const config = {
//   matcher:
//     '/((?!api/login|api/signup|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)'
// }

export const config = {
  matcher: ['/api/:path*']
}

export function middleware(req: NextRequest) {
  // クローンを作成し、リクエストヘッダーにAuthorizationを追加
  const request = req.clone()
  request.headers.set('Set-Cookie', cookies().toString())

  // console.log('middleware')

  // 新しいレスポンスを作成
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  return response
}
