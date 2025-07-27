import { debounce } from 'lodash';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';

import { useRandomUserStore } from '@/shared/stores';

import { CHAT_CREATED, TYPING_CHAT } from '../constants';
import { useChatRoomStore, useChatSocketStore } from '../stores';
import { Chat } from '../types';

export const useChatInputHandler = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useRandomUserStore((state) => state.user);
  const roomID = useChatRoomStore((state) => state.currentRoomID);
  const socketInstance = useChatSocketStore((state) => state.socketInstance);

  const debouncedSetChatInput = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value.trim() === '') {
        socketInstance?.emit(TYPING_CHAT, {
          user: user,
          isTyping: false,
        });
      } else
        socketInstance?.emit(TYPING_CHAT, {
          user: user,
          isTyping: true,
        });
    }, 500), // 500ms 딜레이 적용
    [socketInstance]
  );

  const handleSubmitMessage = () => {
    debouncedSetChatInput.flush();
    const chatItem: Omit<Chat, 'id'> = {
      room_id: roomID ?? '',
      nickname: user?.nickname ?? '',
      color: user?.color ?? '',
      message: inputRef?.current?.value ?? '',
      created_at: new Date().toLocaleDateString(),
    };
    socketInstance?.emit(CHAT_CREATED, chatItem);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    handleSubmitMessage();
  };

  useEffect(() => {
    return () => {
      debouncedSetChatInput.cancel(); // 컴포넌트 언마운트 시 debounce 함수 정리
    };
  }, [debouncedSetChatInput]);

  return {
    inputRef,
    debouncedSetChatInput,
    handleKeyPressEnter,
    handleSubmitMessage,
  };
};
