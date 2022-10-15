import Button from '@components/button'
import Layout from '@components/layout'
import TextArea from '@components/textarea'
import { NextPage } from 'next'

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="동네생활 글쓰기">
      <form className="p-4 space-y-4">
        <TextArea
          required
          placeholder="우리 동네 관련된 질문이나 이야기를 해보세요."
        />
        <Button text="완료" />
      </form>
    </Layout>
  )
}

export default Write
