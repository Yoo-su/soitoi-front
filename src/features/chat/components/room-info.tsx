import { useRandomUserStore } from '@/shared/stores';

export const RoomInfoPannel = () => {
  const user = useRandomUserStore((state) => state.user);
  return (
    <div className={'flex h-full w-80 flex-col gap-8'}>
      <div
        style={{ backgroundColor: user?.color }}
        className={'flex h-56 w-full items-center justify-center rounded-lg text-white'}
      >
        {user?.nickname}
      </div>

      <div className={'flex size-full items-center justify-center rounded-lg bg-[#FBFAFB] text-slate-800'}>white</div>
    </div>
  );
};
