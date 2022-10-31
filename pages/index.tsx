import FloatingButton from '@components/floating-button'
import Layout from '@components/layout'
import Item from '@components/item'
import useUser from '@libs/client/useUser'
import { Product } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import client from '@libs/server/client'
import useSWR, { SWRConfig } from 'swr'

export interface ProductWithCount extends Product {
  _count: {
    favorites: number
  }
}

interface ProductsResponse {
  ok: boolean
  products: ProductWithCount[]
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser()
  const { data } = useSWR<ProductsResponse>('/api/products')
  return (
    <Layout title="홈" hasTabBar seoTitle="">
      <Head>
        <title>당근마켓</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price.toLocaleString('ko-KR')}
            comments={1}
            hearts={product._count?.favorites || 0}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/products': {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  console.log('SSR')
  const products = await client.product.findMany({})
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default Page
