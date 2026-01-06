import Link from 'next/link';
import Pagination from '@/components/Pagination';
import AddWallInfo from '../components/AddWallInfo';
import WallMasonry from '../components/WallMasonry';
import { getCateListAPI, getCateWallListAPI } from '@/api/wall';
import { Cate } from '@/types/app/cate';
import { Wall } from '@/types/app/wall';

interface Props {
  params: Promise<{ cate: string }>;
  searchParams: Promise<{ page: number }>;
}

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

          {/* 留言卡片瀑布流 */}
          <div className="w-[90%] xl:w-[1200px] mx-auto mt-8 pb-12">{tallList.result && tallList.result.length > 0 ? <WallMasonry walls={tallList.result} /> : <div className="text-center py-12 text-gray-500 dark:text-gray-400">暂无留言</div>}</div>

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
