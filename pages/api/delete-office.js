import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id
    } = req.body

    const message = await prisma.office.delete({
        where: {
            id: id,
        },
    })
    res.json(message)
}