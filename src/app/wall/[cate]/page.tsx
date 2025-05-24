import Link from 'next/link'
import Pagination from '@/components/Pagination'
import AddWallInfo from '../components/AddWallInfo'
import { getCateListAPI, getCateWallListAPI } from '@/api/wall'
import dayjs from 'dayjs'
import { Cate } from '@/types/app/cate'
import { Wall } from '@/types/app/wall'
import { FaTag } from 'react-icons/fa'

interface Props {
  params: Promise<{ cate: string }>
  searchParams: Promise<{ page: number }>
}

export default async (props: Props) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const cate = params.cate
  const page = searchParams.page || 1

  const active = '!text-primary !border-primary'

  // 提前把颜色写好，否则会导致样式丢失
  const colors = [
    'bg-[#fcafa24d]',
    'bg-[#a8ed8a4d]',
    'bg-[#caa7f74d]',
    'bg-[#ffe3944d]',
    'bg-[#92e6f54d]'
  ]

  const { data: cateList } = (await getCateListAPI()) || { data: [] as Cate[] }

  const id = cateList.find((item) => item.mark === cate)?.id!
  const { data: tallList } = (await getCateWallListAPI(id, page)) || {
    data: {} as Paginate<Wall[]>
  }

  console.log(cateList, tallList)

  cateList.sort((a, b) => a.order - b.order)

  return (
    <>
      <title>💌 留言墙</title>
      <meta name="description" content="💌 留言墙" />

      <div className="py-16 border-b dark:border-[#4e5969] bg-[linear-gradient(to_right,#fff1eb_0%,#d0edfb_100%)] dark:bg-[linear-gradient(to_right,#232931_0%,#232931_100%)] transition-colors">
        <div className="flex flex-col items-center pb-3">
          <h2 className="text-5xl pt-24">留言墙</h2>
          <p className="text-sm text-gray-600 my-10">留下您的足迹吧~</p>
          <AddWallInfo />
        </div>

        <ul className="flex flex-row overflow-x-auto whitespace-nowrap justify-start md:justify-center text-xs md:text-sm space-x-2 scrollbar-hide p-2">
          {cateList?.map((item) => (
            <li
              key={item.id}
              className={`flex items-center px-3 py-2 min-w-fit dark:text-[#8c9ab1] border-2 border-transparent rounded-full hover:!text-primary hover:border-primary transition-all duration-200 cursor-pointer shadow-sm bg-white/60 dark:bg-[#232931]/60 backdrop-blur-md group ${
                item.mark === cate
                  ? active + ' shadow-primary/30 ring-2 ring-primary/30 scale-105'
                  : ''
              }`}
            >
              <Link href={`/wall/${item.mark}`} className="flex items-center w-full">
                <FaTag className="mr-1 text-xs text-primary/60 group-hover:scale-125 transition-transform" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-[90%] xl:w-[1200px] mx-auto mt-12 grid grid-cols-1 gap-1 xs:grid-cols-2 xs:gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
          {tallList.result?.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col py-2 px-4 bg-[${item.color}] rounded-lg top-0 hover:-top-2 transition-all`}
            >
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-[#8c9ab1]">
                <span>{dayjs(+item.createTime!).format('YYYY-MM-DD HH:mm')}</span>
                <span>{item.cate.name}</span>
              </div>

              <div className="hide_sliding overflow-auto h-32 text-sm my-4 text-gray-700 dark:text-[#cecece]">
                {item.content}
              </div>

              <div className="text-end text-[#5b5b5b] dark:text-[#A0A0A0]">
                {item.name ? item.name : '匿名'}
              </div>
            </div>
          ))}
        </div>

        <Pagination total={tallList.pages} page={page} className="flex justify-center mt-5" />
      </div>
    </>
  )
}
