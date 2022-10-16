import client from '@libs/server/client'
import { ResponseType, withHandler } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body
  const user = phone ? { phone: +phone } : email ? { email } : null
  if (!user) return res.status(400).json({ ok: false, error: 'Bad Request' })
  const payload = Math.floor(100000 + Math.random() * 900000) + ''
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: { ...user },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  })
  if (phone) {
    const msg = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      // to: phone,
      to: process.env.MY_PHONE_NUMBER!,
      body: `Your verification code is ${payload}`,
    })
    console.log(msg)
  }
  return res.json({
    ok: true,
  })
}

export default withHandler('POST', handler)
