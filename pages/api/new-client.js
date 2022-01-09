import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        firstName,
        lastName,
        oib,
        address,
        email,
        phoneNumber,
        dateOfBirth
    } = req.body

    await prisma.client.create({
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
}