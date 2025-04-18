import Slide from '@/components/Slide'
import Starry from '@/components/Starry'
import ImageCard from './components/ImageCard'
import Copyright from '@/app/article/components/Copyright'
import { getLocalDirListAPI } from '@/api/file'
import { getConfigDataAPI } from '@/api/project'
import { getRandom } from '@/utils'
import { Theme } from '@/types/app/project'
import { FileDir } from '@/types/app/file'

const albumData = [
  {
    title: '世界名画',
    description: '我眼里的世界，总是丰富多彩的'
  },
  {
    title: '风景',
    description: '风景如画，美不胜收'
  },
  {
    title: '人物',
    description: '美丽的人儿，总是让人流连忘返'
  }
]

export default async () => {
  const { data } = (await getLocalDirListAPI('album/', 'local')) || { data: {} as FileDir[] }
  const { data: srcData } = (await getConfigDataAPI<Theme>('layout')) || { data: {} as Theme }
  const covers = JSON.parse(srcData.covers || '[]')

  return (
    <>
      <Slide isRipple={false}>
        {/* 星空背景组件 */}
        <Starry />
        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-white text-[20px] xs:text-[25px] sm:text-[30px] whitespace-nowrap custom_text_shadow">
            欢迎来到我的相册
          </div>
          <div className="text-white text-[10px] xs:text-[15px] sm:text-[20px]">
            偷偷地记录我的全世界
          </div>
        </div>
      </Slide>

      <div className="w-[90%] xl:w-[1200px] my-10 mx-auto bg-white dark:bg-black-b p-6 sm:p-10 rounded-xl border dark:border-black-b transition-colors">
        <div className="flex flex-wrap">
          {data?.map((item, index) => {
            const sty = covers[getRandom(0, covers.length - 1)]
            return (
              <ImageCard
                srcData={sty}
                key={index}
                id={item.name}
                title={albumData[index].title}
                description={albumData[index].description}
              />
            )
          })}
        </div>
        <Copyright />
      </div>
    </>
  )
}
