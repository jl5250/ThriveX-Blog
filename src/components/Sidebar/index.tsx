import Author from './Author';
import HotArticle from './HotArticle';
import RandomArticle from './RandomArticle';
import Comment from './Comment';
import RunTime from './RunTime';
import Study from './Study';
import { getWebConfigDataAPI } from '@/api/config';
import { Theme } from '@/types/app/config';
import { getAuthorDataAPI } from '@/api/user';
import { User } from '@/types/app/user';

export default async () => {
  const themeResponse = await getWebConfigDataAPI<{ value: Theme }>('theme');
  const theme = themeResponse?.data?.value || ({} as Theme);
  const sidebar = theme?.right_sidebar || [];
  const { data: user } = (await getAuthorDataAPI()) || { data: {} as User };

  return (
    <>
      <div className={`hidden lg:block ${sidebar.length ? 'lg:w-[29%] xl:w-[24%]' : 'w-0'} rounded-md transition-width sticky top-[70px]`}>
        {/* 作者介绍 */}
        {sidebar.includes('author') && <Author theme={theme} name={user?.name} title={user?.info} handle="javicodes" status="Online" contactText="Contact Me" avatarUrl={user?.avatar} showUserInfo enableTilt={true} enableMobileTilt behindGlowColor="rgba(125, 190, 255, 0.67)" iconUrl={user?.avatar} behindGlowEnabled innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)" />}
        {/* 站点已运行 */}
        {sidebar.includes('runTime') && <RunTime />}
        {/* 随机推荐 */}
        {sidebar.includes('randomArticle') && <RandomArticle />}
        {/* 热门文章 */}
        {sidebar.includes('hotArticle') && <HotArticle />}
        {/* 最新评论 */}
        {sidebar.includes('newComments') && <Comment />}
        {/* 装饰组件 */}
        {sidebar.includes('study') && <Study />}
      </div>
    </>
  );
};
