import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@rahul-pandey-17/common'

const authRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_KEY: string
  }
}>()

authRoutes.post('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const verify = signupInput.safeParse(body)

    if (!verify.success) {
      c.status(400)
      return c.json({
        message: 'Invalid inputs'
      })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword
      }
    })

    const key = c.env.JWT_KEY
    const token = await sign({ id: newUser.id }, key)

    c.status(201)
    return c.json({
      message: 'User created successfully',
      token
    })
  } catch(err) {
    c.status(500)
    return c.json({
      message: 'Something went wrong, please try again'
    })
  }
})

authRoutes.post('/signin', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const verify = signinInput.safeParse(body)

    if (!verify.success) {
      c.status(400)
      return c.json({
        message: 'Invalid inputs'
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (!user) {
      c.status(400)
      return c.json({
        message: 'Invalid username or password'
      })
    }

    const checkPassword = await bcrypt.compare(body.password, user.password)

    if (!checkPassword) {
      c.status(400)
      return c.json({
        message: 'Invalid username or password'
      })
    }

    const key = c.env.JWT_KEY
    const token = await sign({ id: user.id }, key)

    c.status(200)
    return c.json({
      message: 'Logged in successfully',
      token
    })
  } catch(err) {
    c.status(500)
    return c.json({
      message: 'Something went wrong, please try again'
    })
  }
})

export default authRoutes