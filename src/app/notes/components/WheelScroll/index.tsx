'use client'

import { Divider, Spacer } from '@heroui/react'
import { User } from '@/types/app/user'
import { useRef, useEffect, useCallback } from 'react'
import { scroller, Link, Events } from 'react-scroll'
import useDebounce from '@/hooks/useDebounce'

interface WheelScrollProps {
  userData?: User
}

export default (props: WheelScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const current = ['panel1', 'panel2', 'panel3', 'panel4']

  let index = 0

  const handleWheel = (e: WheelEvent) => {
    console.log('handleWheel', e)
    // 执行滚动动画时阻止默认行为
    e.preventDefault()

    // 滚动动画
    // if (e.deltaY > 0 && index <= current.length - 1) {
    //   //当鼠标滚轮向下滚动时
    //   index++
    //   scroller.scrollTo(current[index], {
    //     duration: 800,
    //     smooth: true,
    //     ignoreCancelEvents: true
    //   })
    // } else if (e.deltaY < 0 && index > 0) {
    //   //当鼠标滚轮向上滚动时
    //   if (index !== 0) index--
    //   scroller.scrollTo(current[index], {
    //     duration: 800,
    //     smooth: true
    //   })
    // }
  }

  // 使用自定义防抖函数
  const debouncedFetchArticles = useDebounce(handleWheel, 200)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    Events.scrollEvent.register('begin', function (to, element) {
      console.log('begin', to, element)
    })

    Events.scrollEvent.register('end', function (to, element) {
      console.log('end', to, element)
    })

    // 页面渲染时第一次执行滚动函数
    // if (index === 0) {
    //   scroller.scrollTo(current[index], {
    //     duration: 800,
    //     smooth: true
    //   })
    // }

    // 监听鼠标滚轮事件
    scrollContainer.addEventListener('wheel', debouncedFetchArticles)

    // 清理事件监听器
    return () => {
      scrollContainer.removeEventListener('wheel', debouncedFetchArticles)
    }
  }, [])

  return (
    <div ref={scrollContainerRef} id="ContainerElementID">
      <section id="panel1">
        <div className="overflow-hidden h-screen sm:h-screen md:h-screen relative bg-cover bg-center after:content-[''] after:w-full after:h-[15%] after:absolute after:bottom-0 after:left-0 after:bg-[linear-gradient(to_top,#fff,transparent)] dark:after:bg-[linear-gradient(to_top,#2c333e,transparent)]">
          <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 flex flex-col items-center justify-center">
            {/* 作者头像 */}
            <img
              src={props.userData?.avatar}
              alt="作者头像"
              className="w-20 h-20 rounded-full mr-8 avatar-animation shadow-[5px_11px_30px_20px_rgba(255,255,255,0.1)]"
            />
            <Spacer y={8} />
            <div className="text-white text-[15px] xs:text-[20px] sm:text-[25px] whitespace-nowrap custom_text_shadow">
              {props.userData?.info}
            </div>
            <Divider className="my-4" />
            <div className="text-white text-[20px] xs:text-[25px] sm:text-[30px] whitespace-nowrap custom_text_shadow">
              个人简历&nbsp;|&nbsp;{props.userData?.name}
            </div>
            <div className="text-white text-[5px] xs:text-[10px] sm:text-[15px] whitespace-nowrap custom_text_shadow">
              前端开发工程师
            </div>
            <div className="text-white text-[5px] xs:text-[10px] sm:text-[15px] whitespace-nowrap custom_text_shadow">
              在职广州&nbsp;&nbsp;▣天河
            </div>
          </div>
          <div className="absolute bottom-[18%] left-[50%] transform -translate-x-1/2 flex flex-col z-999">
            <Link to="panel2" smooth={true} duration={500} className="cursor-pointer">
              导航2
            </Link>
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden h-screen sm:h-screen md:h-screen relative bg-cover bg-center scroll-smooth"
        id="panel2"
      >
        <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 flex flex-col items-center justify-center">
          <h1>基本资料</h1>
          <Divider className="my-4" />
          <h2>
            &nbsp;&nbsp;&nbsp;&nbsp;熟悉C#和Java前后端开发，熟悉oracle和mysql数据库，熟悉Html和js及css前端开发，熟悉uniapp跨平台开发，熟悉windows和linux服务器部署web服务，熟悉winform和swing应用程序研发，熟悉云服务器部署建站。
          </h2>
          <div className="flex flex-row">
            {/* 作者头像 */}
            <img
              src={props.userData?.avatar}
              alt="作者头像"
              className="w-80 h-80 rounded-full mr-8 avatar-animation shadow-[5px_11px_30px_20px_rgba(255,255,255,0.1)]"
            />
            <Spacer x={20} />
            <table>
              <tbody>
                <tr>
                  <td className="p-4">姓名 | 王俊龙</td>
                  <td>手机 | 13421558131</td>
                </tr>
                <tr>
                  <td>性别 | 男</td>
                  <td>邮箱 | 1662528926@qq.com</td>
                </tr>
                <tr>
                  <td>出生 | 2000.08.30</td>
                  <td>QQ号 | 1662528926</td>
                </tr>
                <tr>
                  <td>学历 | 本科</td>
                  <td>学校 | 广东金融学院</td>
                </tr>
                <tr>
                  <td>专业 | 计算机科学与技术</td>
                  <td>意向 | Web前端工程师</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="absolute bottom-[18%] left-[50%] transform -translate-x-1/2 flex flex-col z-999">
          <a href="#panel3">导航3</a>
        </div>
      </section>

      <section id="panel3">
        <div className="overflow-hidden h-screen sm:h-screen md:h-screen relative bg-cover bg-center after:content-[''] after:w-full after:h-[15%] after:absolute after:bottom-0 after:left-0 after:bg-[linear-gradient(to_top,#fff,transparent)] dark:after:bg-[linear-gradient(to_top,#2c333e,transparent)]">
          <div className="absolute bottom-[18%] left-[50%] transform -translate-x-1/2 flex flex-col z-999">
            <a href="#panel4">导航4</a>
          </div>
        </div>
      </section>

      <section id="panel4">
        <div className="overflow-hidden h-screen sm:h-screen md:h-screen relative bg-cover bg-center after:content-[''] after:w-full after:h-[15%] after:absolute after:bottom-0 after:left-0 after:bg-[linear-gradient(to_top,#fff,transparent)] dark:after:bg-[linear-gradient(to_top,#2c333e,transparent)]">
          <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 flex flex-col items-center justify-center">
            <h1>联系方式</h1>
            <div className="border-t-2 decoration-dashed decoration-orange-50">
              {/* <!--<span></span>剪刀样式--> */}
            </div>
            <h2>如果你有什么需求，请联系我，让我们一起解决。</h2>
          </div>
          <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 flex flex-col items-center justify-center">
            <ul className="con_style">
              <li>
                <span></span>
                <p>北京市 ▣ 海淀区</p>
              </li>
              <li>
                <span></span>
                <p>1376174000@qq.com</p>
              </li>
              <li>
                <span></span>
                <p>13300000000</p>
              </li>
            </ul>
            <div className="contact_info">
              <form action="" method="get">
                <label>
                  <input type="text" id="username" placeholder="请写上您的名字" />
                  <p id="check_username"></p>
                </label>
                <label>
                  <input type="text" id="usermail" placeholder="请写上您的邮箱" />
                  <p id="check_usermail"></p>
                </label>
                <label>
                  <input type="text" id="usertheme" placeholder="请写上您的主题" />
                  <p id="check_usertheme"></p>
                </label>
                <label>
                  <textarea id="usercon" placeholder="请写上您的内容"></textarea>
                  <p id="check_usercon"></p>
                </label>
                <button>确认发送</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
