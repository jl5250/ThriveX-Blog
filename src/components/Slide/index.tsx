'use client';

import { ReactNode } from 'react';
import Ripple from '@/components/Ripple';
import { getRandom } from '@/utils';
import { useConfigStore } from '@/stores';

interface Props {
  src?: string; // 图片列表
  isRipple?: boolean; // 是否显示波浪
  children?: ReactNode;
}

export default ({ src, isRipple = true, children }: Props) => {
  const theme = useConfigStore((state) => state.theme);
  const covers = theme.covers ?? [];

  const isColor = src?.startsWith('#') || src?.startsWith('rgb') || src?.startsWith('rgba') || src?.startsWith('hsl') || src?.startsWith('hsla');
  const bgValue = src ? src : covers[getRandom(0, covers.length - 1)];

  const sty = isColor
    ? { backgroundColor: bgValue }
    : { backgroundImage: `url(${bgValue})` };

  return (
    <>
      <div className="overflow-hidden h-screen sm:h-screen md:h-screen relative bg-cover bg-center after:content-[''] after:w-full after:h-[10%] after:absolute after:bottom-0 after:left-0 after:bg-[linear-gradient(to_top,#fff,transparent)] dark:after:bg-[linear-gradient(to_top,#2c333e,transparent)]" style={sty}>
        <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] w-full h-full"></div>
        <div className="absolute inset-0 w-full h-full">{children}</div>
      </div>

      {isRipple && <Ripple />}
    </>
  );
};
