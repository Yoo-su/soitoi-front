import { useEffect } from 'react';
import { useWorkSocketStore } from '../stores';
import { Board } from './board';
import { useRandomUserStore } from '@/shared/stores';
import { TopBanner } from './top-banner';

export const Container = () => {
  const user = useRandomUserStore((state) => state.user);
  const { connect, disconnect } = useWorkSocketStore();

  useEffect(() => {
    connect(user!);
    return () => disconnect();
  }, [user]);

  return (
    <div className='container flex flex-col items-center gap-3 bg-[#00839A] shadow-lg rounded-md p-8'>
      <TopBanner />
      <Board />
    </div>
  );
};
