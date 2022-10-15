import Layout from '@components/layout'
import Product from '@components/product'
import { NextPage } from 'next'

const Favorites: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Product
            key={i}
            id={i}
            title="Apple Watch Hermès"
            price={2410000}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Favorites
