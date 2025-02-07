import { useCallback, useEffect } from 'react';
import { useChatSocketStore } from '../stores';

export const useChatSocketService = () => {
  const socketInstance = useChatSocketStore((state) => state.socketInstance);
  const connect = useChatSocketStore((state) => state.connect);
  const disconnect = useChatSocketStore((state) => state.disconnect);

  const handleFindAllChats = useCallback(() => {
    socketInstance?.emit('findAllChat', () => {});
  }, [socketInstance]);

  useEffect(() => {
    connect();
    socketInstance?.on('chat-created', () => {});
    socketInstance?.on('chat-entering', () => {});

    return () => {
      disconnect();
    };
  }, [socketInstance, connect, disconnect]);

  return {
    handleFindAllChats,
  };
};
