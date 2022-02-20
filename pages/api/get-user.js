import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
    } = req.body

    const existingUser = await prisma.auth.findFirst({
        where: {
            id: id
        }
    })

    res.json({user: existingUser})
}
