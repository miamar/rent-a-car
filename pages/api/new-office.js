import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        address,
        phoneNumber,
        workHours
    } = req.body

    const message = await prisma.office.create({
        data: {
            address: address,
            phoneNumber: phoneNumber,
            workHours: workHours
        }
    })
    res.json(message)
}