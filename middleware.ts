import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from 'next/server'

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (userAgent(request).isBot) {
    return new Response('Are you a bot?', { status: 403 })
  }
  // if (!request.url.includes('/api')) {
  //   if (
  //     !request.url.includes('/enter') &&
  //     !request.cookies.get('carrotsession')
  //   ) {
  //     return NextResponse.redirect(`${request.nextUrl.origin}/enter`)
  //   }
  // }
}
