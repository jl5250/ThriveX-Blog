'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AddWallInfo from '../components/AddWallInfo';
import WallMasonry from '../components/WallMasonry';
import Loading from '@/components/Loading';
import { getCateListAPI, getCateWallListAPI } from '@/api/wall';
import { Cate, Wall } from '@/types/app/wall';

export default () => {
  const params = useParams();
  const cate = params?.cate as string;

  const [cateList, setCateList] = useState<Cate[]>([]);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const currentPageRef = useRef(1);

  // 获取分类列表
  useEffect(() => {
    const fetchCateList = async () => {
      const { data } = (await getCateListAPI()) || { data: [] as Cate[] };
      const sorted = [...data].sort((a, b) => a.order - b.order);
      setCateList(sorted);
    };
    fetchCateList();
  }, []);

  // 获取留言列表
  const fetchWallList = useCallback(
    async (page: number, append: boolean = false) => {
      const id = cateList.find((item) => item.mark === cate)?.id ?? 0;
      if (!id) return;

      setLoading(true);
      try {
        const { data: tallList } = (await getCateWallListAPI(id, page, 8)) || { data: {} as Paginate<Wall[]> };

        if (tallList.result && tallList.result.length > 0) {
          if (append) {
            setWalls((prev) => [...prev, ...tallList.result]);
          } else {
            setWalls(tallList.result);
          }
          setTotalPages(tallList.pages || 1);
          setHasMore(page < (tallList.pages || 1));
          currentPageRef.current = page;
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('获取留言列表失败:', error);
        setHasMore(false);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [cate, cateList]
  );

  // 初始加载和分类切换时重新加载
  useEffect(() => {
    if (cateList.length > 0 && cate) {
      setWalls([]);
      setHasMore(true);
      setInitialLoading(true);
      currentPageRef.current = 1;
      fetchWallList(1, false);
    }
  }, [cate, cateList, fetchWallList]);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      // 如果正在加载或没有更多数据，则不处理
      if (loading || !hasMore) return;

      // 检查是否滚动到底部（距离底部100px时触发）
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        const nextPage = currentPageRef.current + 1;
        if (nextPage <= totalPages) {
          fetchWallList(nextPage, true);
        }
      }
    };

    // 使用防抖优化滚动事件
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [hasMore, loading, totalPages, fetchWallList]);

  return (
    <>
      <title>💌 留言墙</title>
      <meta name="description" content="💌 留言墙" />

      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-violet-400/8 blur-[80px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-cyan-400/8 blur-[80px]" />
      </div>

      <div className="py-16 border-b dark:border-[#4e5969]">
        <div className="relative z-10">
          {/* 头部区域 */}
          <div className="flex flex-col items-center px-4 pt-12 md:pt-16 pb-8">
            <div className="relative text-center mb-10">
              <h2 className="text-5xl mb-3">留言墙</h2>
              <p className="text-sm text-gray-600 mb-4">有什么想对我说的，来吧</p>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
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
          {initialLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loading />
            </div>
          ) : (
            <div className="w-[90%] xl:w-[1200px] mx-auto mt-8 pb-12">
              {walls && walls.length > 0 ? (
                <>
                  <WallMasonry walls={walls} />
                  {/* 加载更多指示器 */}
                  {loading && (
                    <div className="flex justify-center items-center py-8">
                      <div className="text-gray-500 dark:text-gray-400 text-sm">加载中...</div>
                    </div>
                  )}
                  {!hasMore && walls.length > 0 && (
                    <div className="flex justify-center items-center py-8">
                      <div className="text-gray-500 dark:text-gray-400 text-sm">没有更多留言了</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">暂无留言</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
