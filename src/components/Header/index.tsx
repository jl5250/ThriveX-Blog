'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// import { Switch } from '@heroui/react';
import Switch from './component/Switch';
import Show from '@/components/Show';
import SidebarNav from './component/SidebarNav';

import { IoIosArrowDown } from 'react-icons/io';
// import { FaRegSun } from 'react-icons/fa';
// import { BsFillMoonStarsFill } from 'react-icons/bs';
import { BsTextIndentLeft } from 'react-icons/bs';

import { Cate } from '@/types/app/cate';
import { getCateListAPI } from '@/api/cate';
import { getWebConfigDataAPI } from '@/api/config';

import { useConfigStore } from '@/stores';
import { Theme, Web } from '@/types/app/config';

const Header = () => {
  // 是否暗黑模式
  const { isDark, setIsDark, setWeb, theme, setTheme } = useConfigStore();

  // 获取项目配置
  const getConfigData = async () => {
    const {
      data: { value: web },
    } = (await getWebConfigDataAPI<{ value: Web }>('web')) || { data: { value: {} as Web } };
    setWeb(web);

    const {
      data: { value: theme },
    } = (await getWebConfigDataAPI<{ value: Theme }>('theme')) || { data: { value: {} as Theme } };
    setTheme(theme);
  };

  const patchName = usePathname();
  // 这些路径段不需要改变导航样式
  const isPathSty = ['/my', '/wall', '/record', '/equipment', '/tags', '/resume', '/album', '/fishpond'].some((path) => patchName.includes(path));
  // 是否改变导航样式
  const [isScrolled, setIsScrolled] = useState(false);

  // 获取分类列表
  const [cateList, setCateList] = useState<Cate[]>([]);
  const getCateList = async () => {
    const { data } = (await getCateListAPI()) || { data: [] as Cate[] };
    setCateList(data);
  };

  useEffect(() => {
    // 监听系统主题变化
    const mediaQuery = matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    });

    getConfigData();
    getCateList();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 手动切换主题
  // const toTheme = () => {
  //   const html = document.querySelector('html');
  //   if (html) {
  //     setIsDark(html.classList.toggle('dark'));
  //   }
  // };
  // 判断当前主题
  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.toggle('dark', isDark);
  }, [isDark]);

  // 是否打开侧边栏导航
  const [isOpenSidebarNav, setIsOpenSidebarNav] = useState(false);

  return (
    <>
      <div className={`header fixed top-0 w-full h-16 backdrop-blur-[5px] z-50 after:content-[''] after:block after:w-full after:h-0 after:bg-[linear-gradient(#fff,transparent_70%)] dark:after:bg-[linear-gradient(#2b333e,transparent_70%)] after:  ${isPathSty || isScrolled ? 'bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(44,51,62,0.9)] border-b dark:border-[#2b333e] after:!h-8 after:transition-height]' : 'border-transparent'} transition-border`}>
        <div className="relative flex justify-center lg:justify-start w-full lg:w-[1500px] h-16 mx-auto">
          <div className={`lg:hidden group absolute top-0 left-0 h-full py-2 px-3 pl-7 ${isPathSty || isScrolled ? 'hover:bg-[#e9edf4] dark:hover:bg-[#455162] rounded-lg' : ''} cursor-pointer  `} onClick={() => setIsOpenSidebarNav(true)}>
            <BsTextIndentLeft className={`group-hover:text-primary h-full text-[30px] ${isPathSty || isScrolled ? 'text-[#333] dark:text-white' : 'text-white'}  `} />
          </div>

          {/* logo */}
          <Link href="/" className="flex items-center p-5 text-[15px]  ">
            {isDark ? <img src={theme?.dark_logo} alt="Logo" className="w-32 h-10 pr-5 hover:scale-90 transition-transform" /> : <img src={isPathSty || isScrolled ? theme?.light_logo : theme?.dark_logo} alt="Logo" className="w-32 h-10 pr-5 hover:scale-90 transition-transform" />}
          </Link>

          <ul className="hidden lg:flex items-center h-16 absolute top-0 right-[200px]">
            <li className="group/one relative">
              <Link href="/" className={`flex items-center p-5 text-[15px] group-hover/one:!text-primary   ${isPathSty || isScrolled ? 'text-[#333] dark:text-white' : 'text-white'}`}>
                💎 首页
              </Link>
            </li>

            {/* 文章分类 */}
            {cateList?.map(
              (one) =>
                one.type === 'cate' && (
                  <li key={one.id} className="group/one relative">
                    <Link href={`/cate/${one.id}?name=${one.name}`} className={`flex items-center p-5 text-[15px] group-hover/one:!text-primary   ${isPathSty || isScrolled ? 'text-[#333] dark:text-white' : 'text-white'}`}>
                      {one.icon} {one.name}
                      <Show is={!!one.children.length}>
                        <IoIosArrowDown className="ml-2" />
                      </Show>
                    </Link>

                    <Show is={!!one.children.length}>
                      <ul className="hidden group-hover/one:block overflow-hidden absolute top-[50px] w-full rounded-md backdrop-blur-[5px] bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(44,51,62,0.95)]" style={{ boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08)' }}>
                        {one.children?.map((two) => (
                          <li key={two.id} className="group/two">
                            <Link href={`/cate/${two.id}?name=${two.name}`} className="relative inline-block w-full p-2.5 text-[15px] box-border text-[#666] dark:text-white hover:!text-primary transition-all after:content-[''] after:absolute after:left-2.5 after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-[3px] after:bg-primary after:transition-width group-hover/two:bg-[#f2f2f2] dark:group-hover/two:bg-[#323e50] group-hover/two:pl-8 hover:after:w-2.5">
                              {two.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Show>
                  </li>
                )
            )}

            <li className="group/one relative">
              <Link href="" className={`flex items-center p-5 px-10 text-[15px] group-hover/one:!text-primary   ${isPathSty || isScrolled ? 'text-[#333] dark:text-white' : 'text-white'}`}>
                🧩 探索
                <Show is={true}>
                  <IoIosArrowDown className="ml-2" />
                </Show>
              </Link>

              <Show is={true}>
                <ul className="hidden group-hover/one:block overflow-hidden absolute top-[50px] w-full rounded-md backdrop-blur-sm bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(44,51,62,0.95)]" style={{ boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08)' }}>
                  {cateList?.map(
                    (item) =>
                      item.type === 'nav' && (
                        <li key={item.id} className="group/two relative">
                          <Link href={`${item.url}`} className={`relative inline-block w-full p-2.5 pl-5 text-[15px] box-border text-[#666] dark:text-white hover:!text-primary transition-all after:content-[''] after:absolute after:left-2.5 after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-[3px] after:bg-primary after:transition-width group-hover/two:pl-8 hover:after:w-2.5`}>
                            {item.icon} {item.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </Show>
            </li>
          </ul>

          {/* 主题切换开关 */}
          <Switch />
          {/* <Switch size="lg" isSelected={isDark} onValueChange={toTheme} thumbIcon={({ isSelected }) => (isSelected ? <BsFillMoonStarsFill className="text-gray-500" /> : <FaRegSun className="text-gray-500" />)} className={`absolute top-0 right-7 h-full ${isDark ? '[&>.bg-default-200]:!bg-[#4e5969]' : '[&>.bg-default-200]:!bg-[#e1e1e1]'}`} /> */}
        </div>
      </div>

      {/* 侧边导航：移动端时候显示 */}
      <SidebarNav list={cateList} open={isOpenSidebarNav} onClose={() => setIsOpenSidebarNav(false)} />
    </>
  );
};

export default Header;
