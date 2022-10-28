import { NextFetchEvent, NextRequest, userAgent } from 'next/server'

export function middleware(request: NextRequest, event: NextFetchEvent) {
  console.log(userAgent(request))
  if (request.nextUrl.pathname.startsWith('/chats')) {
    console.log('Chats only middleware')
  }
}
