import { Hono } from 'hono'

import hello from "./routes/hello"
import cors from "./middleware/cors"

export const route = new Hono()
  .route('/*', cors)
  .route('/hello', hello)

export default route