import Button from '@components/button'
import Layout from '@components/layout'
import { NextPage } from 'next'

const ProductDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">팀 쿡</p>
              <p className="text-xs font-medium text-gray-500">
                판매자 정보 &rarr;
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">아이폰 14 프로</h1>
            <span className="text-2xl block mt-3 text-gray-900">155만원</span>
            <p className=" my-6 text-gray-700">
              iPhone을 다루는 완전히 새로운 방법. 생명을 구할 수 있도록 설계된
              새로운 핵심 안전 기능. 압도적인 디테일을 자랑하는 혁신적인 48MP
              카메라. 이 모든 걸 가능케 하는 궁극의 스마트폰 칩.
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="채팅하기" />
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">이건 어때요?</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className="text-gray-700 -mb-1">아이폰 14 프로 맥스</h3>
                <span className="text-sm font-medium text-gray-900">
                  175만원
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail
