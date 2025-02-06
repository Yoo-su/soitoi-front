'use client';

import { useRandomUserStore } from '../stores';

export const Room = () => {
  const nickname = useRandomUserStore((state) => state.nickname);

  return (
    <div className='w-[680px] h-[820px] shadow-lg rounded-md'>
      {nickname} 님
    </div>
  );
};
