'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import NotFoundSvg from '@/assets/svg/other/404.svg';
import { Button } from '@heroui/react';
import FuzzyText from '@/components/FuzzyText';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <div className="absolute w-screen h-screen bg-white dark:bg-black-b z-[999]">
        <div className="w-full h-[73vh] mt-20">
          <div className="w-full h-full flex justify-center items-center flex-wrap">
            <Image src={NotFoundSvg} alt="404" className="w-full xl:w-[35rem] lg:w-[35rem] md:w-[28rem]" />

            <div className="xl:w-[32rem] lg:w-[26rem] md:w-[20rem] mx-4 text-center">
              <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover className="inline">
                404
              </FuzzyText>
              <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover className="inline" fontSize="clamp(2rem, 3vw, 4rem)">
                not found
              </FuzzyText>
              <p>您正在访问的页面不存在或已被删除</p>
              <Button className="mt-6" color="primary" variant="shadow" onPress={() => router.push('/')}>
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
