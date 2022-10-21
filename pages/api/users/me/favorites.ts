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
  } = req
  const favorites = await client.favorite.findMany({
    where: { userId: user?.id },
    include: { product: true },
  })
  res.json({ ok: true, favorites })
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
