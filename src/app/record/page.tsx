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

  // 获取记录列表
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

  // 初始加载：获取用户信息、主题配置和第一页记录
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 并行获取用户信息、主题配置和第一页记录
        const [userResponse, themeResponse] = await Promise.all([getAuthorDataAPI(), getWebConfigDataAPI<{ value: Theme }>('theme')]);

        if (userResponse?.data) {
          setUser(userResponse.data);
        }
        if (themeResponse?.data?.value) {
          setTheme(themeResponse.data.value);
        }

        // 获取第一页记录
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
          fetchRecordList(nextPage, true);
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
  }, [hasMore, loading, totalPages, fetchRecordList]);

  return (
    <>
      <title>🏕️ 闪念</title>
      <meta name="description" content="🏕️ 闪念" />

      <div className="bg-[linear-gradient(to_right,#fff1eb_0%,#d0edfb_100%)] dark:bg-[linear-gradient(to_right,#232931_0%,#232931_100%)]">
        <div className="w-full lg:w-[800px] px-6 lg:px-0 mx-auto pt-24 pb-10">
          <div className="flex items-center flex-col p-4 mb-10 border dark:border-black-b rounded-lg bg-white dark:bg-black-b bg-[url('https://bu.dusays.com/2025/12/04/6930fe4e06985.jpg')] bg-no-repeat bg-center bg-cover  ">
            <img src={user?.avatar} alt="作者头像" width={80} height={80} className="w-20 h-20 rounded-full avatar-animation shadow-[5px_11px_30px_20px_rgba(255,255,255,0.3)]" />
            <h2 className="my-2 text-white">{theme?.record_name}</h2>
            <h4 className="text-xs text-gray-300">{theme?.record_info}</h4>
          </div>

          {initialLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loading />
            </div>
          ) : (
            <>
              <div className="space-y-12">
                {!!records?.length && records.map((item) => <RecordCard key={item.id} id={item.id as any} content={item.content as any} images={item.images as any} createTime={item.createTime as any} user={user as any} />)}

                <Show is={!records?.length}>
                  <Empty info="内容为空~" />
                </Show>
              </div>

              {/* 懒加载指示器 */}
              {loading && records.length > 0 && (
                <div className="flex justify-center items-center py-8 mt-5 gap-2">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>正在加载...</span>
                  </div>
                </div>
              )}
              {!hasMore && records.length > 0 && (
                <div className="flex justify-center items-center py-8 mt-5">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">没有更多内容了</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
