import { NextApiHandler } from 'next'

export interface ResponseType {
  ok: boolean
  [key: string]: any
}

type method = 'GET' | 'POST' | 'DELETE'

interface ConfigType {
  methods: method[]
  handler: NextApiHandler
  isPrivate?: boolean
}

export const withHandler = ({
  methods,
  isPrivate = true,
  handler,
}: ConfigType): NextApiHandler => {
  return async (req, res): Promise<any> => {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).json({ ok: false, message: 'Method not allowed' })
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Not logged in' })
    }
    try {
      await handler(req, res)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ ok: false, error: 'Internal server error' })
    }
  }
}
