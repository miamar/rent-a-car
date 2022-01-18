import {PrismaClient} from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())


export default app.post('/office', async (req, res) => {
    const {
        address,
        phoneNumber,
        workHours
    } = req.body

    const result = await prisma.office.create({
        data: {
            address: address,
            phoneNumber: phoneNumber,
            workHours: workHours
        }
    })
    res.json({
        success: true,
        payload: result,
    })
})

app.put('/office', async (req, res) => {
    const {
        id,
        address,
        phoneNumber,
        workHours
    } = req.body

    const office = await prisma.office.update({
        where: {
            id: id,
        },
        data: {
            address: address,
            phoneNumber: phoneNumber,
            workHours: workHours
        }
    })
    res.json({
        success: true,
        payload: office,
    })
})

//* 6. Deletes a song by its ID.
app.delete('/office', async (req, res) => {
    const {
        id
    } = req.body

    const office = await prisma.office.delete({
        where: {
            id: id,
        },
    })
    res.json({
        success: true,
        payload: office,
    })
})

app.listen(3001, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)

/*
export default async function handler(req, res) {
    const {
        id,
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

    const message2 = await prisma.office.update({
        where: {
            id: id,
        },
        data: {
            address: address,
            phoneNumber: phoneNumber,
            workHours: workHours
        }
    })
    res.json(message2)

    const message3 = await prisma.office.delete({
        where: {
            id: id,
        },
    })
    res.json(message3)
}*/