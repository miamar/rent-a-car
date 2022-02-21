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
        consumption,
        transmission,
        fuel,
        price
    } = req.body

    const message = await prisma.vehicle.update({
        where: {
            id: id,
        },
        data: {
            plates: plates,
            make: make,
            model: model,
            year: year ? parseInt(year) : 0,
            seats: seats ? parseInt(seats) : 0,
            consumption: consumption ? parseFloat(consumption) : 0,
            transmission: transmission,
            fuel: fuel,
            rented: false,
            price: price ? parseFloat(price) : 0
        },
    }).catch(e => console.log(e))
    res.json(message)

}