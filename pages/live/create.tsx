import Button from '@components/button'
import Input from '@components/input'
import Layout from '@components/layout'
import TextArea from '@components/textarea'
import { NextPage } from 'next'

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="라이브 방송하기">
      <form className=" space-y-4 py-10 px-4">
        <Input required label="제목" name="name" type="text" />
        <Input
          required
          label="가격"
          placeholder="0"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea name="description" label="방송내용" />
        <Button text="방송하기" />
      </form>
    </Layout>
  )
}

export default Create
