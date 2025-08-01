import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef } from 'react';
import { SyncLoader } from 'react-spinners';

import { useRandomUserStore } from '@/shared/stores';

import { useChatBoardHandler, useGetAllChatsQuery } from '../hooks';
import { ChatItem } from './chat-item';

export const ChatBoard = () => {
  const user = useRandomUserStore((state) => state.user);
  const typingUsers = useRandomUserStore((state) => state.typingUsers);
  const { isConnected } = useChatBoardHandler();
  const { data: chats } = useGetAllChatsQuery('1');

  // 스크롤을 항상 맨 아래로 유지하기 위한 ref
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // 채팅 목록이 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, typingUsers]);

  return (
    <div className="flex size-full flex-col space-y-6 overflow-y-auto bg-gray-50 p-4 scrollbar-hide">
      {chats?.map((chat) => {
        const self = chat.nickname === user?.nickname;
        return (
          <ChatItem key={chat.id} self={self}>
            <ChatItem.UserInfo self={self}>
              <ChatItem.Avatar color={chat.color} />
              <ChatItem.Nickname nickname={chat.nickname} />
            </ChatItem.UserInfo>
            <ChatItem.Message self={self} message={chat.message} />
          </ChatItem>
        );
      })}

      {/* 타이핑 중인 사용자가 있다면 목록 아래에 렌더링 */}

      <AnimatePresence>
        {typingUsers.map((user) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            key={user.nickname + user.color}
          >
            <ChatItem>
              <ChatItem.UserInfo>
                <ChatItem.Avatar color={user.color} />
                <ChatItem.Nickname nickname={user.nickname} />
                님이 입력중
              </ChatItem.UserInfo>
              <ChatItem.Message
                message={
                  <div className={'flex w-36 flex-row items-center justify-center py-2'}>
                    <SyncLoader size={4} />
                  </div>
                }
              />
            </ChatItem>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 스크롤 맨 아래 위치 */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
