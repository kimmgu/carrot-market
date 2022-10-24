import Layout from '@components/layout'
import useUser from '@libs/client/useUser'
import { cls } from '@libs/client/utils'
import { Review, User } from '@prisma/client'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'

interface ReviewWithUser extends Review {
  createdBy: User
}

interface ReviewResponse {
  ok: boolean
  reviews: ReviewWithUser[]
}

const Profile: NextPage = () => {
  const { user } = useUser()
  const { data } = useSWR<ReviewResponse>('/api/reviews')
  return (
    <Layout hasTabBar title="나의 당근">
      <div className="px-4">
        <div className="flex items-center mt-4 space-x-3">
          {user?.avatar ? (
            <img
              src={`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${user?.avatar}/avatar`}
              className="w-16 h-16 bg-slate-500 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-slate-500 rounded-full" />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{user?.name}</span>
            <Link href="/profile/edit">
              <a className="text-sm text-gray-700">프로필 수정 &rarr;</a>
            </Link>
          </div>
        </div>
        <div className="mt-10 flex justify-around">
          <Link href="/profile/saleshistory">
            <a className="flex flex-col items-center">
              <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">
                판매내역
              </span>
            </a>
          </Link>

          <Link href="/profile/purchasehistory">
            <a className="flex flex-col items-center">
              <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">
                구매내역
              </span>
            </a>
          </Link>

          <Link href="/profile/favorites">
            <a className="flex flex-col items-center">
              <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">
                관심목록
              </span>
            </a>
          </Link>
        </div>

        {data?.reviews.map((review) => (
          <div key={review.id} className="mt-12">
            <div className="flex space-x-4 items-center">
              <div className="w-12 h-12 rounded-full bg-slate-500" />
              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  {review.createdBy.name}
                </h4>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={cls(
                        'w-4 h-4',
                        review.rating >= star
                          ? 'text-orange-400'
                          : 'text-gray-400'
                      )}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Profile
