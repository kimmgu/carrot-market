import Button from '@components/button'
import Layout from '@components/layout'
import TextArea from '@components/textarea'
import useMutation from '@libs/client/useMutation'
import { Post } from '@prisma/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface WriteForm {
  question: string
}
interface WriteResponse {
  ok: boolean
  post: Post
}

const Write: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<WriteForm>()
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts')
  const onValid = (data: WriteForm) => {
    if (loading) return
    post(data)
  }
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`)
    }
  }, [data, router])
  return (
    <Layout canGoBack title="동네생활 글쓰기">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register('question', { required: true, minLength: 10 })}
          required
          placeholder="우리 동네 관련된 질문이나 이야기를 해보세요."
        />
        <Button text={loading ? '로딩중...' : '완료'} />
      </form>
    </Layout>
  )
}

export default Write
