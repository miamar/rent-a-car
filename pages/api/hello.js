import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const newUser = await prisma.auth.create({
    data: {
      username: 'user',
      email: 'help@vertigo.com',
      password: 'user',
      role: 'user'
    },
  })
  const allUsers = await prisma.auth.findMany()
}
