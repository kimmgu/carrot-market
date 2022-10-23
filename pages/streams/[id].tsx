import Layout from '@components/layout'
import Message from '@components/message'
import { NextPage } from 'next'

const Stream: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">아이폰 14 프로</h1>
          <span className="text-2xl block mt-3 text-gray-900">155 만원</span>
          <p className=" my-6 text-gray-700">
            Ceramic Shield 소재 전면 표면 질감을 살린 무광 글래스 소재 후면 및
            스테인리스 스틸 디자인
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">실시간 채팅</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            <Message message="교통비만 빼주면 안돼?" />
            <Message message="안돼" reversed />
            <Message message="알겠어..." />
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <div className="flex relative max-w-md items-center  w-full mx-auto">
              <input
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  <svg
                    data-testid="geist-icon"
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Stream
