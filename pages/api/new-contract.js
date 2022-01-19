import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        clientId,
        vehicleId,
        workerId,
        rentedFrom,
        rentedUntil
    } = req.body

    const user = await prisma.contract.create({
        data: {
            clientId: parseFloat(clientId),
            vehicleId: parseFloat(vehicleId),
            workerId: parseFloat(workerId),
            rentedFrom: rentedFrom ? new Date(rentedFrom) : new Date(),
            rentedUntil: rentedUntil ? new Date(rentedUntil) : new Date(),
        },
        include: {
            client: true,
            vehicle: true,
            worker: true
        },
    })
    res.json(user)
}