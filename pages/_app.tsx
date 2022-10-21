import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import useUser from '@libs/client/useUser'

function CheckUser() {
  useUser()
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <div className="w-full max-w-xl mx-auto">
        <CheckUser />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  )
}

export default MyApp
