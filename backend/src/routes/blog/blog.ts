import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_KEY: string
  },
  Variables: {
    userId: string
  }
}>()

blogRoutes.use('*', async (c, next) => {
  const header = c.req.header('Authorization')
  const token = header!.split(' ')[1]
  const key = c.env.JWT_KEY

  try {
    const decoded = await verify(token, key) as { id: string }
    c.set('userId', decoded.id)

    await next()
  }catch(err) {
    c.status(401)
    return c.json({
      message: 'Invalid token, access denied'
    })
  }
})

blogRoutes.post('/create', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const userId = c.get('userId')

    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })

    c.status(201)
    return c.json({
      message: 'Blog created successfully',
      blog: newBlog
    })
  } catch(err) {
    c.status(500)
    return c.json({
      message: 'Something went wrong, please try again'
    })
  }
})

blogRoutes.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get('userId')
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId
      }
    })

    c.status(200)
    return c.json({
      message: 'All blog\'s are retrieved successfully',
      blogs
    })
  } catch(err) {
    c.status(500)
    return c.json({
      message: 'Something went wrong, please try again'
    })
  }
})

blogRoutes.get('/:blogId', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogId = c.req.param('blogId')
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId
      }
    })

    c.status(200)
    return c.json({
      message: 'Blog retrieved successfully',
      blog
    })
  } catch(err) {
    c.status(500)
    return c.json({
      message: 'Something went wrong, please try again'
    })
  }
})

blogRoutes.patch('/update/:blogId', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogId = c.req.param('blogId')
    const body = await c.req.json()

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: body.title,
        content: body.content
      }
    })

    c.status(200)
    return c.json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    })
  } catch(err) {
    c.status(500)
    return c.json({
      message: 'Something went wrong, please try again'
    })
  }
})

export default blogRoutes