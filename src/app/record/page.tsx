'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import RecordCard from './components/RecordCard';
import { getRecordPagingAPI } from '@/api/record';
import { getAuthorDataAPI } from '@/api/user';
import { Record } from '@/types/app/record';
import { User } from '@/types/app/user';
import Empty from '@/components/Empty';
import Show from '@/components/Show';
import Loading from '@/components/Loading';
import { getWebConfigDataAPI } from '@/api/config';
import { Theme } from '@/types/app/config';

export default () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const [theme, setTheme] = useState<Theme>({} as Theme);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const currentPageRef = useRef(1);

  const fetchRecordList = useCallback(async (page: number, append: boolean = false) => {
    setLoading(true);
    try {
      const { data: recordData } = (await getRecordPagingAPI({ pagination: { page, size: 8 } })) || {
        data: {} as Paginate<Record[]>,
      };

      if (recordData.result && recordData.result.length > 0) {
        if (append) {
          setRecords((prev) => [...prev, ...recordData.result]);
        } else {
          setRecords(recordData.result);
        }
        setTotalPages(recordData.pages || 1);
        setHasMore(page < (recordData.pages || 1));
        currentPageRef.current = page;
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('获取记录列表失败:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userResponse, themeResponse] = await Promise.all([getAuthorDataAPI(), getWebConfigDataAPI<{ value: Theme }>('theme')]);

        if (userResponse?.data) {
          setUser(userResponse.data);
        }
        if (themeResponse?.data?.value) {
          setTheme(themeResponse.data.value);
        }

        setRecords([]);
        setHasMore(true);
        setInitialLoading(true);
        currentPageRef.current = 1;
        await fetchRecordList(1, false);
      } catch (error) {
        console.error('获取初始数据失败:', error);
        setInitialLoading(false);
      }
    };
    fetchInitialData();
  }, [fetchRecordList]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        const nextPage = currentPageRef.current + 1;
        if (nextPage <= totalPages) {
          fetchRecordList(nextPage, true);
        }
      }
    };

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
  }, [hasMore, loading, totalPages, fetchRecordList]);

  const coverImage = (theme as { record_cover?: string })?.record_cover || theme?.covers?.split?.(',')?.[0] || 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

  return (
    <>
      <title>🏕️ 闪念</title>
      <meta name="description" content="🏕️ 闪念" />

      <div className="bg-gray-100 min-h-screen flex justify-center text-wx-text selection:bg-wx-blue selection:text-white dark:bg-black-a">
        <main className="w-full max-w-[430px] bg-white min-h-screen relative shadow-2xl flex flex-col overflow-y-auto dark:bg-black-b">
          {/* 封面图区域 (Hero) */}
          <section className="relative mb-16">
            <div
              className="h-80 w-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url('${coverImage}')` }}
            />
            <div className="absolute bottom-4 right-4 flex items-end space-x-3">
              <div className="text-white font-bold text-lg mb-4 drop-shadow-md select-none">
                {theme?.record_name || '闪念'} - {user?.name || ''}
              </div>
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-sm cursor-pointer active:opacity-80 transition-opacity">
                <img src={user?.avatar} alt="头像" className="w-full h-full object-cover" width={80} height={80} />
              </div>
            </div>
          </section>

          {/* 内容列表 */}
          <div className="px-4 pb-10 space-y-8">
            {initialLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loading />
              </div>
            ) : (
              <>
                {!!records?.length &&
                  records.map((item, index) => (
                    <div key={item.id}>
                      <RecordCard
                        id={item.id as never}
                        content={item.content as string}
                        images={item.images as string[]}
                        createTime={item.createTime as number}
                        user={user as User}
                      />
                      {index < records.length - 1 && <div className="border-b border-gray-100 dark:border-wx-border mt-8" />}
                    </div>
                  ))}

                <Show is={!records?.length}>
                  <Empty info="内容为空~" />
                </Show>

                {loading && records.length > 0 && (
                  <div className="flex justify-center items-center py-8 gap-2">
                    <div className="flex items-center gap-2 text-wx-light text-sm">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>正在加载...</span>
                    </div>
                  </div>
                )}

                {!hasMore && records.length > 0 && (
                  <div className="text-center py-6">
                    <div className="h-px bg-gray-200 dark:bg-wx-border w-full mb-3" />
                    <span className="text-xs text-wx-light">已显示全部朋友圈</span>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
