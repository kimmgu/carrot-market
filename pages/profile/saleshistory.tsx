import Layout from '@components/layout'
import Item from '@components/item'
import { NextPage } from 'next'

const SalesHistory: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="애플워치 울트라"
            price={1149000}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  )
}

export default SalesHistory
