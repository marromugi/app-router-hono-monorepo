import login from './routes/login'
import signup from './routes/signup'
import me from './routes/me'
import sheet from './routes/sheet'
// import sheetCheckInvitation from './routes/sheet/check-invitation'
import sheetId from './routes/sheet/[id]'
import sheetIdMe from './routes/sheet/[id]/me'
import sheetIdRegister from './routes/sheet/[id]/register'
import sheetIdUser from './routes/sheet/[id]/user'
import sheetIdPayment from './routes/sheet/[id]/payment'
import sheetIdPaymentId from './routes/sheet/[id]/payment/[paymentId]/index'
// import sheetIdPayment from './routes/sheet/[id]/payment'
// import sheetIdRefreshCode from './routes/sheet/[id]/refresh-code'
// import sheetIdRegister from './routes/sheet/[id]/register'
import example from './routes/example'

import cors from './middleware/cors'
import jwt from './middleware/jwt'
import jwtPayload from './middleware/jwtPayload'
import bearerToken from './middleware/bearerToken'
import { Hono } from 'hono'

const app = new Hono()

export const route = app
  .basePath('/api')
  .route('/example', example)
  .route('/*', cors)
  .route('/login', login)
  .route('/signup', signup)
  .route('/sheet/:id/register', sheetIdRegister)
  .route('/*', bearerToken)
  .route('/*', jwt)
  .route('/*', jwtPayload)
  .route('/me', me)
  .route('/sheet', sheet)
  //   .route('/sheet/check-invitation', sheetCheckInvitation)
  .route('/sheet/:id', sheetId)
  // .route('/sheet/:id/login', sheetIdLogin)
  .route('/sheet/:id/me', sheetIdMe)
  .route('/sheet/:id/user', sheetIdUser)
  .route('/sheet/:id/payment', sheetIdPayment)
  .route('/sheet/:id/payment/:paymentId', sheetIdPaymentId)
//   .route('/sheet/:id/payment', sheetIdPayment)
//   .route('/sheet/:id/refresh-code', sheetIdRefreshCode)
//   .route('/sheet/:id/register', sheetIdRegister)

export default route
