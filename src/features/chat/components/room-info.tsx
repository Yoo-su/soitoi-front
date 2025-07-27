import { Button } from '@/shared/components/shadcn';
import { useRandomUserStore } from '@/shared/stores';

export const RoomInfoPannel = () => {
  const user = useRandomUserStore((state) => state.user);
  return (
    <section className={'flex h-full w-80 flex-col gap-8'}>
      <div
        style={{ backgroundColor: user?.color }}
        className={'flex h-56 w-full items-center justify-center rounded-lg text-white'}
      >
        {user?.nickname}
      </div>

      <div className={'flex size-full items-center justify-center rounded-lg bg-white text-slate-800 shadow-md'}>
        pie
        <Button>my button</Button>
      </div>
    </section>
  );
};
