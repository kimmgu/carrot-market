import { ResponseType, withHandler } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req
  const alreadyExists = await client.curiosity.findFirst({
    where: {
      userId: user?.id,
      postId: Number(id),
    },
    select: {
      id: true,
    },
  })
  if (alreadyExists) {
    await client.curiosity.delete({
      where: {
        id: alreadyExists.id,
      },
    })
  } else {
    await client.curiosity.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: Number(id),
          },
        },
      },
    })
  }
  res.json({ ok: true })
}

export default withApiSession(withHandler({ methods: ['POST'], handler }))
