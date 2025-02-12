import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useRandomUserStore } from '@/shared/stores';

import { useChatRoomStore, useChatSocketStore } from '../stores';
import { Chat } from '../types';

export const useChatInputHandler = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useRandomUserStore((state) => state.user);
  const roomID = useChatRoomStore((state) => state.currentRoomID);
  const socketInstance = useChatSocketStore((state) => state.socketInstance);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleChangeChatInput = (event: ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setInputMessage(message);
  };
  const debouncedSetChatInput = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      handleChangeChatInput(event);

      if (value.trim() === '') {
        socketInstance?.emit('typing-chat', {
          user: user,
          isTyping: false,
        });
      } else
        socketInstance?.emit('typing-chat', {
          user: user,
          isTyping: true,
        });
    }, 500), // 500ms 딜레이 적용
    [socketInstance]
  );

  const handleSubmitMessage = () => {
    const chatItem: Omit<Chat, 'id'> = {
      room_id: roomID ?? '',
      nickname: user?.nickname ?? '',
      color: user?.color ?? '',
      message: inputMessage,
      created_at: new Date().toLocaleDateString(),
    };
    socketInstance?.emit('chat-created', chatItem);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    return () => {
      debouncedSetChatInput.cancel(); // 컴포넌트 언마운트 시 debounce 함수 정리
    };
  }, [debouncedSetChatInput]);

  return {
    inputRef,
    debouncedSetChatInput,
    handleSubmitMessage,
  };
};
