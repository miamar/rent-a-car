import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        rented
    } = req.body

    await prisma.vehicle.update({
        where: {
            id: id,
        },
        data: {
            rented: rented
        },
    })
}