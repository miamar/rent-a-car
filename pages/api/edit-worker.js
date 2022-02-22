import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        id,
        username,
        email,
        firstName,
        lastName,
        oib,
        address,
        phoneNumber,
        dateOfBirth,
        basePay,
        afterHours,
        workDays,
        distToJob,
        yearsInCo,
        bonus,
        finalPay
    } = req.body

    await prisma.worker.update({
        where: {
            id: id,
        },
        data: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            oib: oib,
            address: address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
            phoneNumber: phoneNumber,
            basePay: basePay ? parseFloat(basePay) : 0,
            afterHours: afterHours ? parseFloat(afterHours) : 0,
            workDays: workDays ? parseInt(workDays) : 0,
            distToJob: distToJob ? parseFloat(distToJob) : 0,
            yearsInCo: yearsInCo ? parseInt(yearsInCo) : 0,
            bonus: bonus ? true : false,
            finalPay: finalPay ? parseFloat(finalPay) : parseFloat(basePay)
        },
    })
}