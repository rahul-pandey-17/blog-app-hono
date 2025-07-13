import { Hono } from 'hono'
import authRoutes from './routes/auth/auth'
import blogRoutes from './routes/blog/blog'

const app = new Hono()

app.route('/auth', authRoutes)
app.route('/blog', blogRoutes)

export default app
