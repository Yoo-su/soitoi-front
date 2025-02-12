import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { useRandomUserStore } from '@/shared/stores';
import { User } from '@/shared/types';

import { useChatSocketStore } from '../stores';
import { Chat } from '../types';

export const useChatBoardHandler = () => {
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
    if (!socketInstance) return;

    const handleTypingUsers = (typingUsers: User[]) => {
      setTypingUsers(typingUsers.filter((typingUser) => typingUser.nickname !== user?.nickname));
    };

    const handleChatUpdates = (data: { typingUsers: User[]; newChat: Chat }) => {
      const { typingUsers, newChat } = data;
      setTypingUsers([...typingUsers]);
      queryClient.setQueryData(QUERY_KEYS.chat.list.queryKey, (oldData: Chat[] = []) => [...oldData, newChat]);
    };

    socketInstance.on('typing-users', handleTypingUsers);
    socketInstance.on('chat-updates', handleChatUpdates);

    return () => {
      socketInstance.off('typing-users', handleTypingUsers);
      socketInstance.off('chat-updates', handleChatUpdates);
    };
  }, [socketInstance]);

  return { isConnected: !!socketInstance };
};
