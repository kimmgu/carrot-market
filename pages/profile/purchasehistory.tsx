import Layout from '@components/layout'
import Item from '@components/item'
import { NextPage } from 'next'

const PurchaseHistory: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="맥북 에어 M2"
            price={1690000}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  )
}

export default PurchaseHistory
