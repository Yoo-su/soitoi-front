'use client';

import { useEffect } from 'react';

import { ChatBoard } from '@/features/chat/components/chat-board';
import { ChatInput } from '@/features/chat/components/chat-input';
import { RoomInfoPannel } from '@/features/chat/components/room-info';
import { useChatRoomStore } from '@/features/chat/stores';

export const ChatPageComponent = () => {
  const setCurrentRoomID = useChatRoomStore((state) => state.setCurrentRoomID);

  useEffect(() => {
    setCurrentRoomID('1');
  }, []);

  return (
    <div className={`container flex h-[634px] flex-row items-center justify-start gap-10 rounded-md bg-white`}>
      <div className={'flex size-full flex-col gap-4'}>
        <ChatBoard />
        <ChatInput />
      </div>

      <RoomInfoPannel />
    </div>
  );
};
