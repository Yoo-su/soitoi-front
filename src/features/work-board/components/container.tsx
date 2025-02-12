import { useEffect } from 'react';

import { useRandomUserStore } from '@/shared/stores';

import { useWorkSocketStore } from '../stores';
import { Board } from './board';
import { TopBanner } from './top-banner';

export const Container = () => {
  const user = useRandomUserStore((state) => state.user);
  const { connect, disconnect } = useWorkSocketStore();

  useEffect(() => {
    connect(user!);
    return () => disconnect();
  }, [user]);

  return (
    <div className="container flex flex-col items-center gap-3 rounded-md bg-[#00839A] p-8 shadow-lg">
      <TopBanner />
      <Board />
    </div>
  );
};
