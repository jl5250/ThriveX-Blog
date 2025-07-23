import Link from 'next/link'
import { Metadata } from 'next'
import { FaLink, FaInfoCircle, FaRss, FaUserCircle } from 'react-icons/fa'

import { getWebConfigDataAPI } from '@/api/config';
import { getWebListAPI, getWebTypeListAPI } from '@/api/web';
import { Web as WebLink, WebType } from '@/types/app/web';

import Slide from '@/components/Slide';
import Starry from '@/components/Starry';
import ApplyForAdd from './components/ApplyForAdd';
import CopyableText from './components/CopyableText';

import { ToastContainer } from 'react-toastify';
import { getUserDataAPI } from '@/api/user';
import { User } from '@/types/app/user';
import { Web } from '@/types/app/config';

export const metadata: Metadata = {
  title: '😇 朋友圈',
  description: '😇 朋友圈',
};

export default async () => {
  const { data: user } = (await getUserDataAPI()) || { data: {} as User };
  const {
    data: { value: web },
  } = (await getWebConfigDataAPI<{ value: Web }>('web')) || { data: { value: {} as Web } };
  const { data: linkList } = (await getWebListAPI()) || { data: [] as WebLink[] };
  const { data: typeList } = (await getWebTypeListAPI()) || { data: [] as WebType[] };

  let data: { [string: string]: { order: number; list: WebLink[] } } = {};

  linkList.sort((a: WebLink, b: WebLink) => a.order - b.order);

  // 给每个数据进行分组处理
  linkList?.forEach((item: WebLink) => {
    if (data[item.type.name]) {
      data[item.type.name].list.push(item);
    } else {
      // 查询出当前类型的排序
      const order = typeList.find(({ name }) => name === item.type.name)?.order ?? 0;
      data[item.type.name] = { order, list: [] };
      data[item.type.name].list = [item];
    }
  });

  // 根据order进行从小到大排序
  const dataTemp = Object.entries(data);
  dataTemp.sort((a, b) => a[1].order - b[1].order);
  data = Object.fromEntries(dataTemp);

  return (
    <>
      <Slide isRipple={false}>
        {/* 星空背景组件 */}
        <Starry />

        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-white text-[20px] xs:text-[25px] sm:text-[30px] whitespace-nowrap custom_text_shadow">一个人的寂寞，一群人的狂欢！</div>
          <div className="mt-4 sm:mt-8">
            <ApplyForAdd />
          </div>
        </div>
      </Slide>

            <div className="bg-[linear-gradient(180deg,#edf6ff_0%,#ffffff_100%)] dark:bg-[linear-gradient(to_right,#232931_0%,#232931_100%)]">
                <div className="relative -top-0 w-[90%] xl:w-[1200px] p-4 sm:p-10 pt-2 mx-auto bg-white dark:bg-black-b border dark:border-black-b rounded-2xl space-y-8  ">
                    <div>
                        <h3 className="w-full text-center text-xl p-4 dark:text-white  ">本站信息</h3>

            <div className="mx-auto p-3 space-y-2 border-l-[3px] border-primary bg-[#ecf7fe] dark:bg-[#333b48] rounded-md text-sm text-black-b dark:text-gray-300">
              <p>
                站点名称：<CopyableText text={web?.title}>{web?.title}</CopyableText>
              </p>
              <p>
                站点介绍：<CopyableText text={web?.description}>{web?.description}</CopyableText>
              </p>
              <p>
                站点图标：<CopyableText text={user?.avatar || ''}>{user?.avatar}</CopyableText>
              </p>
              <p>
                站点地址：<CopyableText text={web?.url}>{web?.url}</CopyableText>
              </p>
              <p>
                Rss地址：<CopyableText text={web?.url + '/api/rss'}>{web?.url + '/api/rss'}</CopyableText>
              </p>
            </div>
          </div>

          {Object.keys(data)?.map((type, index) => (
            <div key={index}>
              <h3 className="w-full text-xl flex items-center gap-2 p-4 dark:text-white transition-colors">
                <span className="inline-block w-1.5 h-6 rounded bg-gradient-to-b from-primary to-blue-400 mr-2"></span>
                {type}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {type === '全站置顶' && (
                  <Link href="https://liuyuyang.net" target="_blank" className="group">
                    <div className="flex flex-col sm:flex-row items-center p-4 border border-gray-200 dark:border-[#3d4653] rounded-xl transition-all duration-200 bg-white/80 dark:bg-[#232931]/80 shadow-md h-[120px] group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-xl will-change-transform">
                      <img
                        src="https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640"
                        alt="项目作者"
                        className="w-14 h-14 mb-2 sm:mb-0 sm:mr-4 rounded-full border-2 border-primary transition-transform shadow"
                      />
                      <div className="flex flex-col space-y-2 items-center sm:items-start h-[56px] justify-center">
                        <h4 className="text-base font-bold text-gray-700 dark:text-white group-hover:text-primary">
                          宇阳
                        </h4>
                        <p className="text-xs text-[#8c9ab1] line-clamp-2">
                          ThriveX 博客管理系统作者
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
                {data[type].list?.length ? (
                  data[type].list.map((item: WebLink) => (
                    <Link key={item.id} href={item.url} target="_blank" className="group">
                      <div className="flex flex-col sm:flex-row items-center p-4 border border-gray-200 dark:border-[#3d4653] rounded-xl transition-all duration-200 bg-white/80 dark:bg-[#232931]/80 shadow-md h-[140px] group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-xl will-change-transform">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 mb-2 sm:mb-0 sm:mr-4 rounded-full border-2 border-primary transition-transform shadow"
                        />
                        <div className="flex flex-col space-y-2 items-center sm:items-start w-full h-full justify-center">
                          <h4 className="text-base font-bold text-gray-700 dark:text-white group-hover:text-primary truncate w-full">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#8c9ab1] line-clamp-2 w-full">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                    <FaUserCircle className="text-4xl mb-2" />
                    <div className="text-sm">暂无友链，欢迎申请！</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
