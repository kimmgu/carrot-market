import { ResponseType, withHandler } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })
    res.json({ ok: true, post })
  }
  if (req.method === 'GET') {
    const {
      query: { latitude, longitude },
    } = req
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            curiosity: true,
            answers: true,
          },
        },
      },
      where: {
        latitude: {
          gte: Number(latitude) - 0.01,
          lte: Number(latitude) + 0.01,
        },
        longitude: {
          gte: Number(longitude) - 0.01,
          lte: Number(longitude) + 0.01,
        },
      },
    })
    res.json({ ok: true, posts })
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
)
