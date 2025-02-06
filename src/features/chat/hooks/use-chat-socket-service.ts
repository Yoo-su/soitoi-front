import { useCallback, useEffect } from 'react';
import { useChatSocketStore } from '../stores';

export const useChatSocketService = () => {
  const socketinstance = useChatSocketStore((state) => state.socketInstance);
  const connect = useChatSocketStore((state) => state.connect);
  const disconnect = useChatSocketStore((state) => state.disconnect);

  const handleFindAllChats = useCallback(() => {
    socketinstance?.emit('findAllChat', () => {});
  }, [socketinstance]);

  useEffect(() => {
    connect();
    socketinstance?.on('chat-created', () => {});

    return () => {
      disconnect();
    };
  }, [socketinstance, connect, disconnect]);

  return {
    handleFindAllChats,
  };
};
