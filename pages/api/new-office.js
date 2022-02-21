import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const {
            address,
            phoneNumber,
            workHours
        } = req.body

        const newOffice = await prisma.office.create({
            data: {
                address: address,
                phoneNumber: phoneNumber,
                workHours: workHours
            }
        })

        return res.status(200).json(newOffice);
    }

    res.end();
}

export default handler;
