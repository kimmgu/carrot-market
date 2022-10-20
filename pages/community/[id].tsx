import Layout from '@components/layout'
import TextArea from '@components/textarea'
import useMutation from '@libs/client/useMutation'
import { cls } from '@libs/client/utils'
import { Answer, Post, User } from '@prisma/client'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

interface AnswerWithUser extends Answer {
  user: User
}

interface PostWithUser extends Post {
  user: User
  _count: {
    answers: number
    curiosity: number
  }
  answers: AnswerWithUser[]
}

interface CommunityPostResponse {
  ok: boolean
  post: PostWithUser
  isCuriosity: boolean
}

interface AnswerForm {
  answer: string
}

interface AnswerResponse {
  ok: boolean
  respnse: Answer
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter()
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  )
  const [curiosity, { loading }] = useMutation(
    `/api/posts/${router.query.id}/curiosity`
  )
  const onCuriosityClick = () => {
    if (!data) return
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data?.post._count,
            curiosity: data.isCuriosity
              ? data?.post._count.curiosity - 1
              : data?.post._count.curiosity + 1,
          },
        },
        isCuriosity: !data.isCuriosity,
      },
      false
    )
    if (!loading) {
      curiosity({})
    }
  }
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`)
  const { register, handleSubmit, reset } = useForm<AnswerForm>()
  const onValid = (form: AnswerForm) => {
    if (answerLoading) return
    sendAnswer(form)
  }
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset()
    }
  }, [answerData, reset])
  return (
    <Layout canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user?.name}
            </p>
            <Link href={`/users/profiles/${data?.post?.user?.id}`}>
              <a className="text-xs font-medium text-gray-500 flex">
                프로필 보기{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -4 12 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span>{' '}
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-6 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={onCuriosityClick}
              className={cls(
                'flex space-x-1 items-center text-sm',
                data?.isCuriosity ? 'text-orange-500' : 'text-gray-700'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>궁금해요 {data?.post?._count?.curiosity}</span>
            </button>

            <span className="flex space-x-1 items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
              <span>답변 {data?.post?._count?.answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post?.answers?.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="text-xs text-gray-500 block ">
                  {/* {answer.createdAt} */}
                </span>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextArea
            name="description"
            placeholder="댓글을 입력해주세요."
            required
            register={register('answer', { required: true, minLength: 5 })}
          />
          <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            {answerLoading ? '로딩중...' : '답변하기'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default CommunityPostDetail
