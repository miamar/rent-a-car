import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        firstName,
        lastName,
        oib,
        address,
        email,
        phoneNumber,
        dateOfBirth
    } = req.body

    const message = await prisma.client.update({
        where: {
            id: id,
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            oib: oib,
            address: address,
            email: email,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
            phoneNumber: phoneNumber
        },
    })
    res.json(message)
}