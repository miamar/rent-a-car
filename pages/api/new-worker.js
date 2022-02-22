import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        username,
        email,
        firstName,
        lastName,
        oib,
        address,
        phoneNumber,
        dateOfBirth,
        basePay
    } = req.body

    await prisma.worker.create({
        data: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            oib: oib,
            address: address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
            phoneNumber: phoneNumber,
            basePay: basePay ? parseFloat(basePay) : 0
        },
    })
}