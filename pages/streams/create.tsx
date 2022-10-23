import Button from '@components/button'
import Input from '@components/input'
import Layout from '@components/layout'
import TextArea from '@components/textarea'
import useMutation from '@libs/client/useMutation'
import { Stream } from '@prisma/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface CreateForm {
  name: string
  price: string
  description: string
}

interface CreateResponse {
  ok: boolean
  stream: Stream
}

const Create: NextPage = () => {
  const router = useRouter()
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>(`/api/streams`)
  const { register, handleSubmit } = useForm<CreateForm>()
  const onValid = (form: CreateForm) => {
    if (loading) return
    createStream(form)
  }
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`)
    }
  }, [data, router])
  return (
    <Layout canGoBack title="라이브 방송하기">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          register={register('name', { required: true })}
          required
          label="제목"
          name="name"
          type="text"
        />
        <Input
          register={register('price', { required: true })}
          required
          label="가격"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register('description', { required: true })}
          name="description"
          label="방송내용"
        />
        <Button text={loading ? '로딩중...' : '방송하기'} />
      </form>
    </Layout>
  )
}

export default Create
