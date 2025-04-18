import Author from "./Author"
import HotArticle from "./HotArticle"
import RandomArticle from "./RandomArticle"
import Comment from "./Comment"
import { getConfigDataAPI } from '@/api/project'
import { Theme } from "@/types/app/project"

export default async () => {
  const { data: theme } = await getConfigDataAPI<Theme>("layout") || { data: {} as Theme }
  const sidebar: string[] = JSON.parse(theme?.right_sidebar)

  return (
    <>
      <div className={`hidden lg:block ${sidebar.length ? 'lg:w-[29%] xl:w-[24%]' : 'w-0'} rounded-md transition-width sticky top-[70px]`}>
        {/* 作者介绍 */}
        {sidebar.includes("author") && <Author/>}
        {/* 随机推荐 */}
        {sidebar.includes("randomArticle") && <RandomArticle/>}
        {/* 热门文章 */}
        {sidebar.includes("hotArticle") && <HotArticle/>}
        {/* 最新评论 */}
        {sidebar.includes("newComments") && <Comment/>}
      </div>
    </>
  )
}