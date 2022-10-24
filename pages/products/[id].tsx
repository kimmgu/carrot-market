import Button from '@components/button'
import Layout from '@components/layout'
import useMutation from '@libs/client/useMutation'
import useUser from '@libs/client/useUser'
import { cls } from '@libs/client/utils'
import { Product, User } from '@prisma/client'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'

interface ProductWithUser extends Product {
  user: User
}

interface ItemDetailResponse {
  ok: boolean
  product: ProductWithUser
  relatedProducts: Product[]
  isFavorited: boolean
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  )
  const [toggleFavorite] = useMutation(
    `/api/products/${router.query.id}/favorite`
  )
  const onFavoriteClick = () => {
    if (!data) return
    boundMutate(
      (prev) => prev && { ...prev, isFavorited: !prev.isFavorited },
      false
    )
    // mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false)
    toggleFavorite({})
  }
  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              src={`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${data?.product.image}/public`}
              className="bg-slate-300 object-cover"
              layout="fill"
            />
          </div>
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${data?.product?.user?.avatar}/avatar`}
              className="w-12 h-12 rounded-full bg-slate-300"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500 flex">
                  판매자 정보
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
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ₩{data?.product?.price.toLocaleString('ko-KR')}
            </span>
            <p className=" my-6 text-gray-700">{data?.product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="채팅하기" />
              <button
                onClick={onFavoriteClick}
                className={cls(
                  'p-3 rounded-md flex items-center justify-center hover:bg-gray-100',
                  data?.isFavorited
                    ? 'text-orange-500  hover:text-orange-600'
                    : 'text-gray-500  hover:text-gray-600'
                )}
              >
                {data?.isFavorited ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">이건 어때요?</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {/* <Link href={`/products/${data?.product.id}`}> */}
            {data?.relatedProducts?.map((product) => (
              <div key={product.id}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                <span className="text-sm font-medium text-gray-900">
                  ₩{product.price.toLocaleString('ko-KR')}
                </span>
              </div>
            ))}
            {/* </Link> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ItemDetail
