"use client"

import Image from 'next/image'

import { useEffect } from 'react'

import qdAdvanced from '@/assets/svg/technology/qd_advanced.svg'
import qdBasics from '@/assets/svg/technology/qd_basics.svg'
import qdTool from '@/assets/svg/technology/qd_tool.svg'
import rearEnd from '@/assets/svg/technology/rear_end.svg'
import tool from '@/assets/svg/technology/tool.svg'

import AOS from 'aos';
import 'aos/dist/aos.css';

export default () => {
    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <div data-aos="zoom-in" className="w-full md:w-7/12 flex flex-col mt-52 md:mt-0">
                <div className="text-center text-xl mb-8">我的技术栈</div>

                <div className="flex flex-col items-center space-y-2">
                    <div><Image src={tool} alt="软件工具" /></div>
                    <div><Image src={qdBasics} alt="前端基础技术栈" /></div>
                    <div><Image src={qdAdvanced} alt="前端高级技术栈" /></div>
                    <div><Image src={qdTool} alt="前端工具" /></div>
                    <div><Image src={rearEnd} alt="后端技术栈" /></div>
                </div>
            </div>
        </>
    )
}

{/* <div className="flex flex-col items-center space-y-2">
    <div><Image src="https://skillicons.dev/icons?i=html,css,javascript,typescript,jquery,less,scss,tailwind" alt="" /></div>
    <div><Image src="https://skillicons.dev/icons?i=react,nextjs,remix,redux,vue,nuxt,pinia,electron" alt="" /></div>
    <div><Image src="https://skillicons.dev/icons?i=webpack,vite,npm,yarn,pnpm,md,git,github" alt="" /></div>
    <div><Image src="https://skillicons.dev/icons?i=java,spring,maven,python,flask,express,nodejs,nestjs,prisma,mysql,redis,vercel,docker,linux" alt="" /></div>
    <div><Image src="https://skillicons.dev/icons?i=vscode,idea,webstorm,pycharm,postman,ps" alt="" /></div>
</div> */}