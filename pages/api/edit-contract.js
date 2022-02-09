import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        clientId,
        vehicleId,
        workerId,
        rentedFrom,
        rentedUntil
    } = req.body

    const message = await prisma.contract.update({
        where: {
            id: id,
        },
        data: {
            clientId: parseFloat(clientId),
            vehicleId: parseFloat(vehicleId),
            workerId: parseFloat(workerId),
            rentedFrom: rentedFrom ? new Date(rentedFrom) : new Date(),
            rentedUntil: rentedUntil ? new Date(rentedUntil) : new Date(),
        }
    })
    res.json(message)
}