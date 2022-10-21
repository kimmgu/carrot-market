import Layout from '@components/layout'
import { NextPage } from 'next'
import ProductList from '@components/product-list'

const PurchaseHistory: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  )
}

export default PurchaseHistory
