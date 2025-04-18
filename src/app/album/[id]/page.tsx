import Slide from '@/components/Slide'
import Starry from '@/components/Starry'
import PhotoCard from '../components/PhotoCard'
import { getFileListAPI } from '@/api/file'
import { File } from '@/types/app/file'
import BackButton from '../components/BackButton'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ title: string; description: string }>
}

export default async (props: Props) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const id = params.id
  const title = searchParams.title
  const description = searchParams.description

  const { data } = (await getFileListAPI('album/' + id, 'local')) || { data: {} as File[] }

  return (
    <>
      <Slide isRipple={false}>
        {/* 星空背景组件 */}
        <Starry />
        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-white text-[20px] xs:text-[25px] sm:text-[30px] whitespace-nowrap custom_text_shadow">
            {title}
          </div>
          <div className="text-white text-[10px] xs:text-[15px] sm:text-[20px]">{description}</div>
        </div>
      </Slide>
      <div className="w-[90%] xl:w-[1200px] my-10 mx-auto bg-slate-50 dark:bg-black-b p-6 sm:p-10 rounded-xl border dark:border-black-b transition-colors">
        {/* 返回按钮 */}
        <BackButton />
        {/* 相册列表 */}
        <PhotoCard albumList={data} key={id} />
      </div>
    </>
  )
}
