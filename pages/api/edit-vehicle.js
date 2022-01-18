import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        plates,
        make,
        model,
        year,
        seats,
        transmission,
        fuel,
        price
    } = req.body

    await prisma.vehicle.update({
        where: {
            id: id,
        },
        data: {
            plates: plates,
            make: make,
            model: model,
            year: year ? parseFloat(year) : 0,
            seats: seats ? parseFloat(seats) : 0,
            transmission: transmission,
            fuel: fuel,
            rented: false,
            price: price ? parseFloat(price) : 0,
            clientId: 1
        },
    })
}