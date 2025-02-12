import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { useRandomUserStore } from '@/shared/stores';
import { User } from '@/shared/types';

import { useChatSocketStore } from '../stores';
import { Chat } from '../types';

export const useChatSocketService = () => {
  const queryClient = useQueryClient();
  const user = useRandomUserStore((state) => state.user);
  const socketInstance = useChatSocketStore((state) => state.socketInstance);
  const setTypingUsers = useRandomUserStore((state) => state.setTypingUsers);
  const connect = useChatSocketStore((state) => state.connect);
  const disconnect = useChatSocketStore((state) => state.disconnect);

  useEffect(() => {
    connect(user!);
    return () => {
      disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socketInstance) {
      // 메시지를 입력중인 사용자에 대한 이벤트
      socketInstance.on('typing-users', (typingUsers: User[]) => {
        setTypingUsers([...typingUsers].filter((typingUser) => typingUser.nickname !== user?.nickname));
      });

      // 새로운 chat 등록 이벤트
      socketInstance.on('chat-updates', (data: { typingUsers: User[]; newChat: Chat }) => {
        const { typingUsers, newChat } = data;
        setTypingUsers([...typingUsers]);
        queryClient.setQueryData(QUERY_KEYS.chat.list.queryKey, (oldData: Chat[] = []) => {
          return [...oldData, newChat];
        });
      });
    }
    return () => {
      if (socketInstance) {
        socketInstance.off('typing-users');
        socketInstance.off('chat-updates');
      }
    };
  }, [socketInstance]);

  return {};
};
