'use client';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface Props {
  list: string[];
}

export default ({ list }: Props) => {
  if (!list?.length) return null;

  return (
    <PhotoProvider speed={() => 800} easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}>
      {list.length === 1 ? (
        <div className="max-w-[70%]">
          <PhotoView src={list[0]}>
            <img src={list[0]} alt="闪念图片" className="w-full h-auto rounded-sm object-cover cursor-pointer active:opacity-90" />
          </PhotoView>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 max-w-[90%]">
          {list.map((url, index) => (
            <div key={index} className="aspect-square bg-wx-gray dark:bg-black-a overflow-hidden cursor-pointer active:opacity-90">
              <PhotoView src={url}>
                <img src={url} alt="闪念图片" className="w-full h-full object-cover" />
              </PhotoView>
            </div>
          ))}
        </div>
      )}
    </PhotoProvider>
  );
};
