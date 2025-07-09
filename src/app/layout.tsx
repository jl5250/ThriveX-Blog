import localFont from 'next/font/local'

import HeroUIProvider from '@/components/HeroUIProvider'
import NProgress from '@/components/NProgress'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Tools from '@/components/Tools'
import Confetti from '@/components/Confetti'
import RouteChangeHandler from '@/components/RouteChangeHandler'
import MusicTools from '@/components/MusicTools'

import { getWebConfigDataAPI } from '@/api/config'
import { Web } from '@/types/app/config';

// 加载样式文件
import "@/styles/index.scss";
import "@/styles/tailwind.scss";
import BaiduStatis from '@/components/BaiduStatis';
import FloatingBlock from '@/components/FloatingBlock';

// 加载本地字体
const LXGWWenKai = localFont({
  src: '../assets/font/LXGWWenKai-Regular.ttf',
  display: 'swap'
})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data } = (await getWebConfigDataAPI<Web>("web")) || { data: {} as Web };

  // 尊重开源，禁止删除此版权信息！！！
  console.log('🚀 欢迎使用 ThriveX 现代化博客管理系统')
  console.log('🎉 开源地址：https://github.com/LiuYuYang01/ThriveX-Blog')
  console.log('🏕 作者主页：https://liuyuyang.net')
  console.log('🌟 觉得好用的话记得点个 Star 哦 🙏')

  return (
    <html lang="zh-CN" className={LXGWWenKai.className}>
      <head>
        <title>{`${data?.title} - ${data?.subhead}`}</title>
        <meta name="description" content={data?.description} />
        <meta name="keywords" content={data?.keyword} />
        <link rel="icon" href={data?.favicon || '/favicon.ico'} />
        {/* 统计鸟 */}
        <script
          type="text/javascript"
          src="//api.tongjiniao.com/c?_=793517014552158208"
          async
        ></script>

        {/* 百度统计 */}
        <BaiduStatis />
      </head>

      {/* 监听路由变化 */}
      <RouteChangeHandler />

      <body id="root" className={`dark:!bg-black-a`}>
        {/* 🎉 礼花效果 */}
        {/* <Confetti /> */}

        {/* 进度条组件 */}
        <NProgress />
        {/* 顶部导航组件 */}
        <Header />

        {/* 主体内容 */}
        <HeroUIProvider>
          <div className="min-h-[calc(100vh-300px)]">{children}</div>
        </HeroUIProvider>

        {/* 底部组件 */}
        <Footer />

        {/* 左侧音乐组件 */}
        <MusicTools />

        {/* 右侧工具栏组件 */}
        {/* <Tools /> */}
        <FloatingBlock />
      </body>
    </html>
  )
}
