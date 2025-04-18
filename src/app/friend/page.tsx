import Link from "next/link";
import { Metadata } from "next";

import { getConfigDataAPI } from "@/api/project";
import { getWebListAPI, getWebTypeListAPI } from '@/api/web'
import { Web as WebLink, WebType } from "@/types/app/web";

import Slide from "@/components/Slide";
import Starry from "@/components/Starry";
import ApplyForAdd from "./components/ApplyForAdd";

import { ToastContainer } from "react-toastify";
import { getUserDataAPI } from "@/api/user";
import { User } from "@/types/app/user";
import { Web } from "@/types/app/project";

export const metadata: Metadata = {
    title: "朋友圈"
};

export default async () => {
    const { data: user } = await getUserDataAPI() || { data: {} as User }
    const { data: web } = await getConfigDataAPI<Web>("web") || { data: {} as Web }
    const { data: linkList } = await getWebListAPI() || { data: [] as WebLink[] }
    const { data: typeList } = await getWebTypeListAPI() || { data: [] as WebType[] }

    let data: { [string: string]: { order: number, list: WebLink[] } } = {}

    linkList.sort((a: WebLink, b: WebLink) => a.order - b.order)

    // 给每个数据进行分组处理
    linkList?.forEach((item: WebLink) => {
        if (data[item.type.name]) {
            data[item.type.name].list.push(item)
        } else {
            // 查询出当前类型的排序
            const order = typeList.find(({ name }) => name === item.type.name)?.order!
            data[item.type.name] = { order, list: [] }
            data[item.type.name].list = [item]
        }
    })

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
                <div className="relative -top-0 w-[90%] xl:w-[1200px] p-10 pt-2 mx-auto bg-white dark:bg-black-b border dark:border-black-b rounded-2xl space-y-8 transition-colors">
                    <div>
                        <h3 className="w-full text-center text-xl p-4 dark:text-white transition-colors">本站信息</h3>

                        <div className="mx-auto p-3 space-y-2 border-l-[3px] border-primary bg-[#ecf7fe] rounded-md text-sm text-black-b">
                            <p>站点名称：<span className="hover:text-primary cursor-pointer">{web.title}</span></p>
                            <p>站点介绍：<span className="hover:text-primary cursor-pointer">{web.description}</span></p>
                            <p>站点图标：<span className="hover:text-primary cursor-pointer">{user.avatar}</span></p>
                            <p>站点地址：<span className="hover:text-primary cursor-pointer">{web.url}</span></p>
                            <p>Rss地址：<span className="hover:text-primary cursor-pointer">{web.url + '/api/rss'}</span></p>
                        </div>
                    </div>

                    {
                        Object.keys(data)?.map((type, index) => (
                            <div key={index}>
                                <h3 className="w-full text-center text-xl p-4 dark:text-white transition-colors">{type}</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {
                                        type === "全站置顶" &&
                                        <Link href="https://liuyuyang.net" target="_blank" className="group">
                                            <div className="flex items-center p-3 border group-hover:border-2 dark:border-[#3d4653] group-hover:!border-primary group-hover:shadow-[0_10px_20px_1px_rgb(83,157,253,.1)] rounded-md transition-colors">
                                                <img src="https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640" alt="项目作者" className="w-14 h-14 mr-4 rounded-full" />

                                                <div className="flex flex-col space-y-2">
                                                    <h4 className="text-sm text-gray-700 dark:text-white group-hover:text-primary">宇阳</h4>
                                                    <p className="text-xs text-[#8c9ab1] line-clamp-2">ThriveX 博客管理系统作者</p>
                                                </div>
                                            </div>
                                        </Link>
                                    }

                                    {
                                        data[type].list?.map((item: WebLink) => (
                                            <Link key={item.id} href={item.url} target="_blank" className="group">
                                                <div key={item.id} className="flex items-center p-3 border group-hover:border-2 dark:border-[#3d4653] group-hover:!border-primary group-hover:shadow-[0_10px_20px_1px_rgb(83,157,253,.1)] rounded-md transition-colors">
                                                    <img src={item.image} alt={item.title} className="w-14 h-14 mr-4 rounded-full" />

                                                    <div className="flex flex-col space-y-2">
                                                        <h4 className="text-sm text-gray-700 dark:text-white group-hover:text-primary">{item.title}</h4>
                                                        <p className="text-xs text-[#8c9ab1] line-clamp-2">{item.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ToastContainer />
        </>
    )
}