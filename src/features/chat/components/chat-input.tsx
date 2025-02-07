import { useState } from 'react';
import { Button, Input } from '@headlessui/react';
import { debounce } from 'lodash';
import { useChatRoomStore, useChatSocketStore } from '../stores';

export const ChatInput = () => {
  const roomID = useChatRoomStore((state) => state.currentRoomID);
  const socketInstance = useChatSocketStore((state) => state.socketInstance);
  const [chatInput, setChatInput] = useState<string>('');

  const handleChangeChatInput = (newChat: string) => {
    debounce(() => {
      setChatInput(newChat);
    }, 500);
  };

  const handleSubmitChat = () => {
    const newChat = socketInstance?.emit('new-chat');
  };

  return (
    <div className={'w-full flex flew-row items-center px-1 py-2'}>
      <Input
        onChange={(e) => handleChangeChatInput(e.target.value)}
        className={'flex-grow border-none'}
        name={'chat'}
        value={chatInput}
      />
      <Button className={'bg-stone-600 text-white'}>send</Button>
    </div>
  );
};
