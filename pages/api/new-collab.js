import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        name,
        type,
        description,
        website
    } = req.body

    await prisma.collaborator.create({
        data: {
            name: name,
            type: type,
            description: description,
            website: website
        },
    })
}