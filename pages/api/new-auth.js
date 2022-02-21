import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req, res) => {

  const newUser = await prisma.auth.create({
    data: {
      username: 'user',
      email: 'help@vertigo.com',
      password: 'user',
      role: 'user'
    }
  })
  return res.status(200).json(newUser);

  const allUsers = await prisma.auth.findMany()

  res.end();
}

export default  handler;