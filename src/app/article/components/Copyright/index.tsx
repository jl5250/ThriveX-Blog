import { getUserDataAPI } from '@/api/user';
import { User } from '@/types/app/user';

const Copyright = async () => {
  const { data } = (await getUserDataAPI()) || { data: {} as User };

  return (
    <div className="p-3 space-y-2 border-l-[3px] border-primary bg-[#ecf7fe] rounded-md text-sm text-black-b">
      <p>作者：{data?.name}</p>
      <p>版权：此文章版权归 {data?.name} 所有，如有转载，请注明出处!</p>
    </div>
  );
};

export default Copyright;
