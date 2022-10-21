import client from '@libs/server/client'
import { ResponseType, withHandler } from '@libs/server/withHandler'
import { withApiSession } from '@libs/server/withSession'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
})

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body
  const user = phone ? { phone } : email ? { email } : null
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
    // const msg = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
    //   // to: phone,
    //   to: process.env.MY_PHONE_NUMBER!,
    //   body: `Your verification code is ${payload}`,
    // })
    // console.log(msg)
  } else if (email) {
    // const mail = await mg.messages.create('mingufkim@gmail.com', {
    //   from: 'Mingu Kim <mingufkim@gmail.com>',
    //   to: email,
    //   subject: 'Carrot Market Verification Code',
    //   text: `Your verification code is ${payload}`,
    // })
    // console.log(mail)
  }
  return res.json({
    ok: true,
  })
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
)
