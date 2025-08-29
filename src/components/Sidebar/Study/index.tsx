import Image from 'next/image';
import IconCloud from '@/app/my/component/IconCloud';
import StudySvg from '@/assets/svg/other/study.svg';

const techIcons = ['scss', 'css', 'html', 'tailwindcss', 'axios', 'fetch', 'vue', 'vuex', 'redux', 'zustand', 'element-plus', 'typescript', 'javascript', 'antdesign', 'motion', 'pinia', 'framer-motion', 'echarts', 'java', 'spring', 'springboot', 'mybatis', 'mybatis-plus', 'redis', 'rabbitmq', 'mysql', 'mongodb', 'react', 'nextjs', 'nestjs', 'webpack', 'vite', 'nodedotjs', 'nextdotjs', 'prisma', 'koa', 'express', 'python', 'flask', 'nginx', 'vercel', 'docker', 'git', 'github', 'visualstudiocode', 'intellijidea', 'datagrip', 'apifox', 'postman', 'trae', 'cursor', 'webstorm', 'navicat', 'hbuilder', 'hbuilderx', 'googledrive', 'apple', 'windows', 'linux', 'pycharm', 'wechat'];

export default () => {
  return (
    <div className="flex flex-col tw_container bg-white dark:bg-black-b p-4 mb-5 tw_title">
      <div className="tw_title w-full dark:text-white">
        <Image src={StudySvg} alt="最新评论" width={33} height={23} className="mr-2" /> 学无止境
      </div>

      <div className="mt-4 flex justify-center w-5/6">
        <IconCloud iconSlugs={techIcons} />
      </div>
    </div>
  );
};
