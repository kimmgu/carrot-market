import { ResponseType, withHandler } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'
import { Kind } from '@prisma/client'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req
  const record = await client.record.findMany({
    where: { userId: user?.id, kind: kind as Kind },
    include: { product: true },
  })
  res.json({ ok: true, record })
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
