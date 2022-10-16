import client from '@libs/server/client'
import { ResponseType, withHandler } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'

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
  return res.json({
    ok: true,
  })
}

export default withHandler('POST', handler)
