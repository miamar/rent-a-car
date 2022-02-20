import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        email,
        password
    } = req.body

    const existingUser = await prisma.auth.findFirst({
        where: {
            email: email,
            password: password
        }
    })

    res.json({user: existingUser})


}
