import Link from 'next/link';
import Image from 'next/image';
import { getConfigDataAPI } from '@/api/project'
import { getArticleListAPI } from '@/api/article';
import { IoIosArrowForward } from "react-icons/io";
import fire from '@/assets/svg/other/fire.svg';
import "./index.scss";
import { Theme } from '@/types/app/project';
import { Article } from '@/types/app/article';

const RandomArticle = async () => {
    const { data: theme } = await getConfigDataAPI<Theme>("layout") || { data: {} as Theme }
    const { data: article } = await getArticleListAPI() || { data: [] as Article[] }

    const ids = JSON.parse(theme.reco_article ? theme.reco_article : '[]')
    const list = article?.filter((item: Article) => ids.includes(item.id + ''))

    return (
        <div className='hotArticleComponent'>
            <div className="flex flex-col tw_container bg-white dark:bg-black-b p-4 mb-5 tw_title">
                <div className="tw_title w-full dark:text-white">
                    <Image src={fire} alt='作者推荐' width={30} height={20} />
                    <span> 作者推荐</span>
                </div>

                {/* 文章列表 */}
                <div className='w-full'>
                    {list?.map((item: Article) => (
                        <div key={item.id}>
                            <Link href={`/article/${item.id}`} target='_blank' className='w-full flex items-center py-2 text-gray-600 dark:text-[#8c9ab1] text-sm transition-all hover:!text-primary hover:pl-2'>
                                <IoIosArrowForward className="text-lg mr-1" />
                                <span className='w-full line-clamp-1'>{item.title}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RandomArticle;