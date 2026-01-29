import ImageList from './ImageList';
import Editor from './Editor';
import { dayFormat } from '@/utils';
import { User } from '@/types/app/user';

interface RecordItemProps {
  id: number | string;
  content: string;
  images: string | string[] | null;
  createTime?: string | number | Date;
  user: Pick<User, 'avatar' | 'name'> | null;
}

export default function RecordCard({ id, content, images, createTime, user }: RecordItemProps) {
  const imageList: string[] = Array.isArray(images) ? images : JSON.parse((images as string) || '[]');

  return (
    <article key={id} className="flex space-x-3">
      <div className="flex-shrink-0">
        <img
          src={user?.avatar}
          alt="作者头像"
          width={40}
          height={40}
          className="w-10 h-10 rounded-lg object-cover cursor-pointer active:bg-wx-gray"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-wx-blue font-semibold text-[15px] cursor-pointer w-fit mb-1">{user?.name}</h3>
        <div className="text-[15px] leading-6 mb-2 text-wx-text break-words">
          <Editor value={content} />
        </div>

        <div className="mb-3">
          <ImageList list={imageList} />
        </div>

        <div className="flex justify-between items-center text-xs text-wx-light">
          <span>{dayFormat(createTime as number)}</span>
          <div className="bg-wx-gray dark:bg-black-a px-2 py-1 rounded text-wx-blue font-bold cursor-pointer active:opacity-80">
            <span className="tracking-widest text-lg leading-3">··</span>
          </div>
        </div>
      </div>
    </article>
  );
}
