import { useCallback, useEffect } from 'react';
import { useChatStore } from '../stores';

export const useChatSocketService = () => {
  const socketinstance = useChatStore((state) => state.socketInstance);
  const connect = useChatStore((state) => state.connect);
  const disconnect = useChatStore((state) => state.disconnect);

  const handleFindAllChats = useCallback(() => {
    socketinstance?.emit('findAllChat', () => {});
  }, [socketinstance]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    handleFindAllChats,
  };
};
