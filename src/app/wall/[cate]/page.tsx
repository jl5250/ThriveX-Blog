import Link from 'next/link';
import Pagination from '@/components/Pagination';
import AddWallInfo from '../components/AddWallInfo';
import { getCateListAPI, getCateWallListAPI } from '@/api/wall';
import dayjs from 'dayjs';
import { Cate } from '@/types/app/cate';
import { Wall } from '@/types/app/wall';

interface Props {
  params: Promise<{ cate: string }>;
  searchParams: Promise<{ page: number }>;
}

// 颜色映射表，将颜色值映射到对应的 Tailwind 类名
const colorMap: Record<string, string> = {
  '#fcafa24d': 'bg-[#fcafa24d]',
  '#a8ed8a4d': 'bg-[#a8ed8a4d]',
  '#caa7f74d': 'bg-[#caa7f74d]',
  '#ffe3944d': 'bg-[#ffe3944d]',
  '#92e6f54d': 'bg-[#92e6f54d]',
};

export default async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const cate = params.cate;
  const page = searchParams.page || 1;

  const { data: cateList } = (await getCateListAPI()) || { data: [] as Cate[] };

  const id = cateList.find((item) => item.mark === cate)?.id ?? 0;
  const { data: tallList } = (await getCateWallListAPI(id, page)) || { data: {} as Paginate<Wall[]> };

  cateList.sort((a, b) => a.order - b.order);

  return (
    <>
      <title>💌 留言墙</title>
      <meta name="description" content="💌 留言墙" />

      <div className="py-16 border-b dark:border-[#4e5969] bg-[linear-gradient(to_right,#fff1eb_0%,#d0edfb_100%)] dark:bg-[linear-gradient(to_right,#232931_0%,#232931_100%)]  ">
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          {/* 头部区域 */}
          <div className="flex flex-col items-center px-4 pt-12 md:pt-24 pb-8">
            <div className="text-center mb-6">
              <h2 className="text-5xl mb-10">留言墙</h2>
              <p className="text-sm text-gray-600 mb-4">有什么想对我说的，来吧</p>
            </div>

            <div className="mb-8">
              <AddWallInfo />
            </div>
          </div>

          {/* 分类标签 */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 mb-8">
            {cateList?.map((item) => (
              <Link
                key={item.id}
                href={`/wall/${item.mark}`}
                className={`
                  relative px-5 py-2.5 text-sm font-medium rounded-full
                  transition-transform
                  ${item.mark === cate ? 'text-white bg-primary scale-105' : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border dark:border-gray-700/50 hover:text-primary hover:scale-105'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 留言卡片网格 */}
          <div className="w-[90%] xl:w-[1200px] mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 pb-12">
            {tallList.result?.map((item, index) => {
              const bgColor = colorMap[item.color] || 'bg-[#ffe3944d]';
              return (
                <div
                  key={item.id}
                  className={`
                    group relative flex flex-col p-5 rounded-2xl
                    ${bgColor}
                    backdrop-blur-sm
                    border border-white/30 dark:border-gray-700/30
                    hover:shadow-md
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-[1.02]
                    cursor-pointer
                    overflow-hidden
                    animate-fade-in-up
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* 卡片装饰边框 */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/20 dark:border-gray-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* 顶部信息 */}
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/20 dark:border-gray-700/30">
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{dayjs(+item.createTime!).format('YYYY-MM-DD HH:mm')}</span>
                    <span className="px-2.5 py-1 text-xs font-semibold backdrop-blur-sm text-gray-700 dark:text-white bg-white/60 dark:bg-gray-800/60 rounded-full">{item.cate.name}</span>
                  </div>

                  {/* 留言内容 */}
                  <div className="flex-1 hide_sliding overflow-auto min-h-[100px] max-h-[140px] text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 my-3 px-1">{item.content}</div>

                  {/* 底部署名 */}
                  <div className="flex justify-end items-center mt-4 pt-3 border-t border-white/20 dark:border-gray-700/30">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">—</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name ? item.name : '匿名'}</span>
                    </div>
                  </div>

                  {/* Hover 时的光效 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 dark:from-transparent dark:via-transparent dark:to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* 分页 */}
          {tallList.total && (
            <div className="flex justify-center mt-8 pb-8">
              <Pagination total={tallList.pages} page={page} className="flex justify-center" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
