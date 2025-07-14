import { Hono } from 'hono'
import authRoutes from './routes/auth/auth'
import blogRoutes from './routes/blog/blog'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.route('/auth', authRoutes)
app.route('/blog', blogRoutes)

export default app
