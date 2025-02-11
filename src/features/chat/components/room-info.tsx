import { useRandomUserStore } from '@/shared/stores';

export const RoomInfoPannel = () => {
  const user = useRandomUserStore((state) => state.user);
  return (
    <div className={'flex flex-col w-80 h-full gap-8'}>
      <div
        style={{ backgroundColor: user?.color }}
        className={
          'flex rounded-lg w-full h-56 justify-center items-center text-white'
        }
      >
        {user?.nickname}
      </div>

      <div
        className={
          'flex rounded-lg w-full h-full justify-center items-center bg-[#FBFAFB] text-slate-800'
        }
      >
        white
      </div>
    </div>
  );
};
