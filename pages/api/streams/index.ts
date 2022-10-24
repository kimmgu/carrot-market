import { ResponseType, withHandler } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req
  if (req.method === 'POST') {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json()
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
        cloudflareId: uid,
        cloudflareUrl: url,
        cloudflareKey: streamKey,
      },
    })
    res.json({ ok: true, stream })
  } else if (req.method === 'GET') {
    const streams = await client.stream.findMany({
      take: 10,
      skip: 10,
    })
    res.json({ ok: true, streams })
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
)
