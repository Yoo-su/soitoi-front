import { useEffect } from 'react';
import { useWorkSocketStore } from '../stores';
import { Board } from './board';
import { useRandomUserStore } from '@/shared/stores';

export const Container = () => {
  const user = useRandomUserStore((state) => state.user);
  const { connect, disconnect } = useWorkSocketStore();

  useEffect(() => {
    connect(user!);
    return () => disconnect();
  }, [user]);

  return (
    <div className='container bg-[#00839A] shadow-lg rounded-sm p-2'>
      <Board />
    </div>
  );
};
