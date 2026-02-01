import { getPageConfigDataByNameAPI } from '@/api/config';
import { Config } from '@/types/app/config';

interface Equipment {
  category: string;
  description: string;
  items: { name: string; description: string; price: string; image: string; color: string }[];
}

export default async () => {
  const { data } = (await getPageConfigDataByNameAPI('equipment')) || { data: {} as Config };
  const value = (data?.value as { list: Equipment[] }) || { list: [] };

  const defaultItem = {
    name: '未命名设备',
    image: '',
    price: '0',
    description: '暂无描述',
    color: '#f5f5f5',
  };

  const defaultGroup = {
    category: '未分类',
    description: '暂无描述',
    items: [] as Equipment['items'],
  };

  const safeList: Equipment[] = (value.list || []).map((group) => ({
    ...defaultGroup,
    ...group,
    items: (group?.items || []).map((item) => ({
      ...defaultItem,
      ...item,
      price: `${item.price ?? defaultItem.price}`,
      color: item.color || defaultItem.color,
    })),
  }));

  return (
    <>
      <title>🔭 我的设备 - 工欲善其事必先利其器</title>
      <meta name="description" content="🔭 分享我的生产力工具" />

      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-violet-400/8 blur-[80px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-cyan-400/8 blur-[80px]" />
      </div>

      <div className="pt-20 pb-10">
        <div className="w-[90%] lg:w-[1200px] mx-auto mt-10 space-y-20 md:space-y-24">
          {safeList.map((group, index) => (
            <div key={index}>
              <h2 className="text-xl">{group.category}</h2>
              <p className="text-gray-600 mb-6">{group.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.items.map((item, idx) => (
                  <div key={idx} className="group overflow-hidden border rounded-lg bg-white dark:bg-black-a transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="flex justify-center h-40" style={{ backgroundColor: item.color }}>
                      <img src={item.image} alt={item.name} className="h-full object-cover" />
                    </div>

                    <div className="p-4">
                      <h3 className="group-hover:text-primary  ">{item.name}</h3>
                      <p className="text-gray-500 text-sm pt-2 mb-4 line-clamp-2">{item.description}</p>
                      <span className="mt-2 py-1 px-1.5 rounded-md text-white bg-gray-300 group-hover:bg-primary  ">￥{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
