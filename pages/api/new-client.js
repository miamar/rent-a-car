import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const {
            firstName,
            lastName,
            oib,
            address,
            email,
            phoneNumber,
            dateOfBirth
        } = req.body

        const newClient = await prisma.client.create({
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

        return res.status(200).json(newClient);
    }

    res.end();
}

export default handler;

