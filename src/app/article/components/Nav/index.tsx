"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import directory from '@/assets/svg/other/directory.svg';

import "./index.scss";

interface NavItem {
    name: string;
    href: string;
    start: number;
    end?: number;
    className: string;
}

// 定义距离视口顶部多少像素时高亮导航项
const OFFSET = 85;

const ContentNav = () => {
    const [open, setOpen] = useState(false);
    const [navs, setNavs] = useState<NavItem[]>([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const list = document.querySelectorAll(".content h1, .content h2, .content h3");

            list?.forEach((nav,index) => {
                nav.setAttribute("id", nav.textContent! + index);

                switch (nav.tagName) {
                    case "H1":
                        nav.setAttribute("class", "h1");
                        break;
                    case "H2":
                        nav.setAttribute("class", "h2");
                        break;
                    case "H3":
                        nav.setAttribute("class", "h3");
                        break;
                }
            });

            // 给每个标题设置一个视口顶部的距离
            const titles = Array.from(list)?.map(t => {
                const top = t.getBoundingClientRect().top + window.scrollY;
                return { href: t.textContent!, top, className: t.className };
            });

            // 设置起始距离和结束距离
            const titlesList: NavItem[] = titles?.map((title, index) => ({
                name: title.href,
                href: title.href + index,
                start: title.top - OFFSET, // 减去偏移量
                end: index < titles.length - 1 ? titles[index + 1].top - OFFSET : Infinity,
                className: title.className
            }));

            setNavs(titlesList);

            // 页面滚动到指定位置高亮导航项
            const onHandleScroll = () => {
                const scrollPosition = window.scrollY;
                const activeIndex = titlesList.findIndex(
                    (item) => scrollPosition >= item.start && scrollPosition < item.end!
                );

                if (activeIndex !== -1) {
                    setActive(activeIndex);
                }
            };

            // 初始化时执行一次，设置初始高亮状态
            onHandleScroll();

            window.addEventListener("scroll", onHandleScroll);

            return () => {
                window.removeEventListener("scroll", onHandleScroll);
            };
        }, 0);
    }, []);

    // 添加点击处理函数
    const onHandleToNavItem = (index: number, href: string) => {
        const element = document.getElementById(href);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY - OFFSET;
            window.scrollTo({
                top: elementPosition,
                behavior: 'instant'  // 改为instant实现直接跳转，不使用平滑效果
            });
            setActive(index);
        }
    };

    return (
        <>
            {open
                ? (
                    <div className="fixed bottom-5 right-5 sm:top-[80%] sm:left-[320px] z-50 cursor-pointer flex justify-center items-center w-12 h-12 rounded-xl bg-white dark:bg-black-b dark:border-[#4e5969] p-3 border" onClick={() => setOpen(false)}>
                        <MdOutlineKeyboardDoubleArrowLeft className="w-full text-4xl text-primary" />
                    </div>
                )
                : (
                    !!navs?.length &&
                    <div className="fixed top-[80%] left-[2%] z-50 cursor-pointer w-12 h-12 rounded-xl bg-white dark:bg-black-b dark:border-[#4e5969] p-3 border" onClick={() => setOpen(true)}>
                        <Image src={directory} alt="" width={23} height={23} className="text-5xl text-primary" />
                    </div >
                )
            }

            <div className={`ContentNavComponent overflow-auto fixed top-0 z-[60] max-w-0 h-screen bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(30,36,46,0.9)] backdrop-blur-sm shadow-[16px_0px_15px_-3px_rgba(101,155,246,0.1)] ${open ? 'min-w-[300px] p-[20px_10px]' : 'min-w-0'} transition-[min-width] hide_sliding`}>
                <div className="flex justify-center items-center mt-5">
                    <Image src={directory} alt="" width={23} height={23} className="mr-2" /> 目录
                </div>

                <div className="text-[#4d4d4d] dark:text-[#8c9ab1] text-sm w-full mt-4">
                    {navs?.map((item, index) => (
                        <a
                            key={index}
                            href={`#${item.href}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onHandleToNavItem(index, item.href);
                            }}
                            className={`nav_item overflow-hidden relative block p-1 pl-5 mb-[5px] hover:text-primary ${active === index ? 'text-primary pl-[30px] rounded-[10px] text-[15px] dark:bg-[#313d4e99] before:!left-4' : ''} ${item.className}`}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ContentNav;
