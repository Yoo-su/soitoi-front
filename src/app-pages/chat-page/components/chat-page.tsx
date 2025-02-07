'use client';

import { useGetAllRoomsQuery } from '@/features/chat/hooks';

export const ChatPageComponent = () => {
  const { data: rooms } = useGetAllRoomsQuery();

  if (!rooms) return;

  return (
    <div className='container flex items-center justify-center border border-sky-500 m-4 p-6'>
      hh
    </div>
  );
};
