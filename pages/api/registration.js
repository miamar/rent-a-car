import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        role,
        username,
        email,
        password,
        firstName,
        lastName,
        oib,
        address,
        phoneNumber,
        dateOfBirth,
        pay
    } = req.body

    await prisma.worker.create({
        data: {
            username: username,
            role: role,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            oib: oib,
            address: address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
            phoneNumber: phoneNumber,
            pay: pay ? parseFloat(pay) : 0,
            position: ""
        },
    })
}