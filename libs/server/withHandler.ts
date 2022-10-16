import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

// export default function withHandler(
//   method: 'GET' | 'POST' | 'DELETE',
//   fn: (req: NextApiRequest, res: NextApiResponse) => void
// ) {
//   return async function (req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== method) {
//       return res.status(405).end()
//     }
//     try {
//       await fn(req, res)
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ error })
//     }
//   }
// }

export const withHandler = (
  method: 'GET' | 'POST' | 'DELETE',
  handler: NextApiHandler
): NextApiHandler => {
  return async (req, res) => {
    if (req.method !== method) {
      res.status(405).end()
    }
    try {
      await handler(req, res)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
