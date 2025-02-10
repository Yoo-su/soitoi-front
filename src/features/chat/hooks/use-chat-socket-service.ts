import { useEffect } from 'react';
import { useChatSocketStore, useRandomUserStore } from '../stores';
import { Chat, User } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

export const useChatSocketService = () => {
  const queryClient = useQueryClient();
  const user = useRandomUserStore((state) => state.user);
  const socketInstance = useChatSocketStore((state) => state.socketInstance);
  const setTypingUsers = useRandomUserStore((state) => state.setTypingUsers);
  const connect = useChatSocketStore((state) => state.connect);
  const disconnect = useChatSocketStore((state) => state.disconnect);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('typing-users', (typingUsers: User[]) => {
        setTypingUsers(
          [...typingUsers].filter(
            (typingUser) => typingUser.nickname !== user?.nickname
          )
        );
      });
      socketInstance.on(
        'chat-updates',
        (data: { typingUsers: User[]; newChat: Chat }) => {
          const { typingUsers, newChat } = data;
          setTypingUsers([...typingUsers]);
          queryClient.setQueryData(
            QUERY_KEYS.chat.list().queryKey,
            (oldData: Chat[]) => {
              return [...oldData, newChat];
            }
          );
        }
      );
    }
    return () => {
      if (socketInstance) {
        socketInstance.off('typing-users');
      }
    };
  }, [socketInstance]);

  return {};
};
