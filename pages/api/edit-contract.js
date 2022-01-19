import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        clientId,
        vehicleId,
        workerId
    } = req.body

    const message = await prisma.contract.update({
        where: {
            id: id,
        },
        data: {
            clientId: clientId,
            vehicleId: vehicleId,
            workerId: workerId
        }
    })
    res.json(message)
}