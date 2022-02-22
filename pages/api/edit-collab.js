import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        name,
        type,
        description,
        website
    } = req.body

    const message = await prisma.collaborator.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            type: type,
            description: description,
            website: website
        },
    })
    res.json(message)
}