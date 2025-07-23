'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Cate } from '@/types/app/album';
import { getAlbumCatePagingAPI } from '@/api/album';
import Masonry from 'react-masonry-css';
import './page.scss';
import Link from 'next/link';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  700: 2,
};

export default function AlbumPage() {
  const router = useRouter();

  const [list, setList] = useState<Cate[]>([]);

  const getAlbumCatePaging = async () => {
    const { data } = (await getAlbumCatePagingAPI(1, 9999)) || { data: {} as Paginate<Cate[]> };
    setList(data.result);
  };

  useEffect(() => {
    getAlbumCatePaging()
  }, [])

  return (
    <>
      <title>📷 照片墙</title>
      <meta name="description" content="📷 照片墙" />

      {/* 介绍部分 */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 动态背景 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
          <div className="absolute inset-0 bg-[url('https://pic1.imgdb.cn/item/6826fef858cb8da5c8f67ab1.jpg')] bg-cover bg-center animate-ken-burns" />
        </div>

        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-20 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            我的照片墙
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            记录生活中的每一个精彩瞬间，让回忆永远定格在最美的时刻
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                浏览相册
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 相册集 */}
      <div className=" bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">相册集</h2>
          </motion.div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid mb-12"
              columnClassName="masonry-grid_column"
            >
              {list.map((cate, index) => (
                <motion.div
                  key={cate.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6"
                >
                  <Link href={`/album/${cate.id}?name=${cate.name}`}>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                      {/* 图片容器 */}
                      <div className="aspect-w-1 aspect-h-1 w-full">
                        <img
                          src={cate.cover}
                          alt={cate.name}
                          className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                        />
                      </div>

                      {/* 分类标签 */}
                      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
                        {cate.name}
                      </div>

                      {/* 标题遮罩 */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-medium text-lg">{cate.name}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
}
